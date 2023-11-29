import React, { useEffect, useRef } from "react"

interface AudioPlayerProps {
  src: string
  isPlay: boolean
}

function AudioPlayer({ src, isPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.play()
  }, [])

  return (
    <>
      {isPlay && (
        <div>
          <audio ref={audioRef} preload="auto" loop src={src} />
        </div>
      )}
    </>
  )
}

export default AudioPlayer
