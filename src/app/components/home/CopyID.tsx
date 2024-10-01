"use client"
import { useSocketContext } from '@/app/GlobalContext';
import { copyToClipboard } from '@/app/utils/utility';
import React from 'react'
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

const CopyID = () => {
  const myID = useSocketContext();
    const copyID = ()=>{
        copyToClipboard(myID?.me);
      }
  return (
    <div className="flex gap-1 items-center cursor-pointer"  onClick={copyID}>
      {
        myID?.me?
        <>
          <div className="w-[85px] overflow-hidden text-xs" >{myID?.me}</div>
          <HiOutlineDocumentDuplicate />
        </>
        :
        <div className='px-1 rounded-full bg-green-500'>
          <p className="m-0 text-white text-xs animate-pulse">Connecting...</p>
        </div>

      }
    </div>
  )
}

export default CopyID