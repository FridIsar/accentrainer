'use client'

import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { 
  MicrophoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/solid';

const Dictaphone = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(null) // null or boolean
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()
  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
  }, [browserSupportsSpeechRecognition])
  if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator
  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>
  }

  const handleMouseDown = () => {
    setIsPressed(true);
  };
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  const color = isPressed ? "green-500" : "gray-500";

  return (
    <div>

      <div className={`text-${color} flex items-center justify-center min-h-screen  before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]`}>
        <button
          className={`z-10 flex items-center justify-center focus:outline-none bg-transparent border w-40 h-40 lg:w-44 lg:h-44 border-gray-400 rounded-full text-${color}`}
          onMouseDown={() => { handleMouseDown(); SpeechRecognition.startListening(); }}
          onMouseUp={() => { handleMouseUp(); SpeechRecognition.stopListening(); }}
        >
          <MicrophoneIcon className={`w-3/4 text-${color}`} />
        </button>
      </div>
      <div className="flex items-center border-b border-teal-500 py-2">
      <SpeakerWaveIcon className="h-8"/>
        <div className="appearance-none bg-transparent border-none w-full text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"><span className="font-bold">What I'm hearing: </span> {`${transcript}`}</div>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" onClick={resetTranscript} type="button">
          Reset
        </button>
      </div>
      
      
      <div className="flex items-center border-b border-teal-500 py-2">
      <ChatBubbleOvalLeftEllipsisIcon className="h-8"/>
      <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Type here what you want to say..." aria-label="Full name"></input>
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
          Listen
        </button>
      </div>
    </div>
  )
}

export default Dictaphone