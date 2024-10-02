export interface Call {
isReceivingCall: boolean, 
from: string | null, 
name: string | null, 
signal: any ,
to: string | null,
isCaller: boolean,
toName: string
}

export interface SocketContextInterfce {
    call: any,
    callAccepted: any,
    myVideo: any,
    userVideo: any,
    stream: any,
    name: any,
    setName: any,
    callEnded: any,
    me: any,
    callUser: any,
    leaveCall: any,
    answerCall: any,
    rejectCall: any,
    videoState: VideoStateInterface,
    handleVideoStateChange: any
  }

export interface VideoStateInterface{
    "video": boolean,
    "audio": boolean
}