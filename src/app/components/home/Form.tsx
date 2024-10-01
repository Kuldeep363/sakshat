"use client";
import { useSocketContext } from "@/app/GlobalContext";
import React, { useCallback, useEffect, useState } from "react";
import { HiMiniPhone } from "react-icons/hi2";

const Form = () => {
  const socketContext = useSocketContext();
  const [formData, setFormdata] = useState({
    myName: "",
    callerUUID: "",
  });
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleBlur = () => {
    try {
      localStorage.setItem("username", formData.myName);
      socketContext?.setName(formData.myName);
    } catch (err) {
      console.log("Set storage issue: ", err);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    socketContext?.callUser(formData.callerUUID);
  };

  useEffect(() => {
    try {
      const username: string | null = localStorage.getItem("username");
      username &&
        setFormdata((prev) => ({
          ...prev,
          myName: username,
        }));
      socketContext?.setName(username);
    } catch (err) {
      console.error("Get storage issue: ", err);
    }
  }, []);

  return (
    <form
      className="flex gap-2 justify-between items-center flex-col"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        name="myName"
        id="myName"
        value={formData.myName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your name"
        className="w-full rounded-md px-3 py-2 outline-none border-solid border-[#ededed] border text-slate-800 text-sm"
      />
      {socketContext?.callAccepted && !socketContext.callEnded ? null : (
        <>
          <input
            type="text"
            name="callerUUID"
            id="callerUUID"
            value={formData.callerUUID}
            onChange={handleChange}
            placeholder="Enter secure id of reciever"
            className="w-full rounded-md px-3 py-2 outline-none border-solid border-[#ededed] border text-slate-800 text-sm"
          />
          <button className="bg-[var(--primary-color)] text-white rounded-full p-2 w-full ">
            <div className="flex items-center gap-1 justify-center">
              <HiMiniPhone />
              <span>Call</span>
            </div>
          </button>
        </>
      )}
      {
        socketContext?.callAccepted && !socketContext?.callEnded?
        <button className="bg-red-600 text-white rounded-full p-2 w-full " onClick={()=>socketContext.leaveCall()}>
            <div className="flex items-center gap-1 justify-center">
              <HiMiniPhone />
              <span>End Call</span>
            </div>
          </button>
          :
          null
      }
    </form>
  );
};

export default Form;
