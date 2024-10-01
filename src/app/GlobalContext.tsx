"use client";
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { io } from "socket.io-client";
import Peer, { Instance } from "simple-peer";
import {
  Call,
  SocketContextInterfce,
  VideoStateInterface,
} from "./utils/interface";
import { successToast } from "./utils/utility";
import Calling from "./components/extra/Calling";

const SocketContext = createContext<SocketContextInterfce | null>(null);

const GlobalContext = ({ children }: { children: ReactNode }) => {
  const socket = useRef<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(true);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<Call>({
    isReceivingCall: false,
    from: "",
    name: "",
    to: "",
    signal: null,
    isCaller: true,
  });
  const [me, setMe] = useState<string | undefined>("");
  const [videoState, setVideoState] = useState<VideoStateInterface>({
    video: true,
    audio: true,
  });
  const handleVideoStateChange = (type: keyof VideoStateInterface) => {
    setVideoState((prev: VideoStateInterface) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>();
  const connectionRef = useRef<Instance | null>();

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socket.current.on("connect", () => {
      console.log("Connected with ID:", socket.current.id);
      setMe(socket.current.id); // Optionally set it as your user ID
      successToast("Connected");
    });

    socket.current.on("callUser", ({ from, name: callerName, signal,to }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal, isCaller: false, to });
    });

    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setMe(storedUserId);
    }

    socket.current.on("callRejected", () => {
      console.log("call rejected...");
      setCall({ isReceivingCall: false, from: "", name: "", signal: null, to:"", isCaller: false });
      setCallAccepted(false);
      setCallEnded(true);
    });

    return () => {
      socket.current.disconnect(); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current && (myVideo.current.srcObject = currentStream);
      });

    return () => {
      if (myVideo.current) {
        const currentStream: any = myVideo.current.srcObject;
        if (currentStream) {
          const tracks = currentStream.getTracks();
          tracks.forEach((track: any) => track.stop()); // Stop all media tracks
        }
      }
    };
  }, []);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = videoState.audio;
      });
    }
  }, [videoState.audio, stream]);

  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = videoState.video;
      });
    }
  }, [videoState.video, stream]);

  const answerCall = () => {
    setCallAccepted(true);
    setCallEnded(false);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current && (userVideo.current.srcObject = currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current && (userVideo.current.srcObject = currentStream);
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setCallEnded(false);
      setCall(prev=>({
        ...prev,
        to: id,
        isCaller: true
      }))

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const rejectCall = (id: string | null) => {
    socket.current.emit("rejectCall", { userToReject: id });
    setCall({ isReceivingCall: false, from: "", name: "", signal: null, to: "", isCaller: false });
  };

  const leaveCall = () => {
      rejectCall(call.isCaller ? call.to:call.from);
      setCallEnded(true);
      setCallAccepted(false);
      connectionRef.current?.destroy();
      connectionRef.current = null;

    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        rejectCall,
        videoState,
        handleVideoStateChange,
      }}
    >
      {children}
      <Calling />
    </SocketContext.Provider>
  );
};

export default GlobalContext;

export const useSocketContext = () => useContext(SocketContext);
