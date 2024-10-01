"use client"
import { useSocketContext } from "@/app/GlobalContext";
import React from "react";
import { HiPhone } from "react-icons/hi";

const Calling = () => {
    const socketContext = useSocketContext();
    
  return (
    (socketContext?.call.isReceivingCall && !socketContext.callAccepted)?
    <div className="flex p-3 rounded-md bg-white absolute bottom-2 left-1/2 -translate-x-1/2 w-max  gap-1 items-center">
      <p className="m-0">{socketContext.call.name} calling...</p>
      <div className="p-2 rounded-full w-8 h-8 bg-red-600 text-center cursor-pointer" onClick={()=>socketContext.rejectCall(socketContext.call.from)}>
        <HiPhone className="text-white" />
      </div>
      <div className="p-2 rounded-full w-8 h-8 bg-green-600 cursor-pointer" onClick={socketContext.answerCall}>
        <HiPhone className="text-white" />
      </div>
    </div>
    :
    null
  );
};

export default Calling;
