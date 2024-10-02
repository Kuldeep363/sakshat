'use client'
import React from 'react'
import Video from './Video'
import { useSocketContext } from '@/app/GlobalContext'

const VideoCall = () => {
    const socketContext = useSocketContext();
  return (
    <div className="w-full mb-4 flex gap-1 justify-between">
          <Video videoRef={socketContext?.myVideo} type="my" user={socketContext?.name} />
          {
            socketContext?.callAccepted && !socketContext.callEnded ?
            <Video videoRef={socketContext?.userVideo} type="caller" user={socketContext?.call?.toName} />
            :
            null
          }
        </div>
  )
}

export default VideoCall