"use client"
import { useSocketContext } from '@/app/GlobalContext';
import { PiVideoCameraSlashFill } from "react-icons/pi";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { BsMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

interface VideoInterface{
    videoRef: any,
    type: string,
    user: string
}

const Video: React.FC<VideoInterface> = ({videoRef,type,user}) => {
    const socketContext = useSocketContext();
    
  return (
    <div className='flex-1 rounded-md overflow-hidden h-80 bg-slate-900 relative'>
        {
            socketContext?.stream?
            <div className='w-full relative h-full'>
                <video playsInline muted ref={videoRef} autoPlay className="w-full h-full rounded-md object-cover" />
                {
                    type === "my"?
                        <div className='absolute z-30 bottom-2 p-2 left-1/2 -translate-x-1/2 rounded-full flex gap-2'>
                            <div className='w-12 h-12 rounded-full bg-[#fefefe60] grid place-items-center cursor-pointer' onClick={()=>socketContext.handleVideoStateChange("video")}>
                                {
                                    socketContext.videoState.video?
                                    <HiMiniVideoCamera className='text-white w-6 h-6'/>
                                    :
                                    <HiMiniVideoCameraSlash className='text-white w-6 h-6'/>
                                }
                            </div>
                            <div className='w-12 h-12 rounded-full bg-[#fefefe60] grid place-items-center cursor-pointer' onClick={()=> socketContext.handleVideoStateChange("audio")}>
                                {
                                    socketContext.videoState.audio?
                                    <BsMicFill className='text-white w-6 h-6'/>
                                    :
                                    <BsFillMicMuteFill className='text-white w-6 h-6'/>
                                }
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            :
            <div className='flex justify-center items-center gap-1 w-full h-full min-h-60'>
                <PiVideoCameraSlashFill className='text-slate-400'/>
                <p className="m-0 text-slate-400">Camera not detected</p>
            </div>
        }
        <p className="m-0 absolute top-1 left-1 text-white z-40">{user?.slice(0,1).toUpperCase()+user?.slice(1)}</p>
    </div>
  )
}

export default Video