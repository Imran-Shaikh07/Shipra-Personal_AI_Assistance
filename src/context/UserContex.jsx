import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContex({children}) {
    let [speaking,setSpeaking]=useState(false)
    let [recognitionText,setRecognitionText] = useState("listening...")
    let [response,setResponse] = useState(false)
    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate =1;
        text_speak.pitch=1;
        text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak)
    }
   async function aiResponse(prompt){
       let text = await run(prompt)
       let newText = text.split("*")&&text.split("**")&&text.replace("google","Imran Shaikh")&&text.replace("Google","Imran Shaikh")
       setRecognitionText(newText)
       speak(newText)
       setResponse(true)
       setTimeout(()=>{
        setSpeaking(false)
       },5000)
       
    }
    let speechRecognition = window.SpeechRecognition  || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex
        let transcript=e.results[currentIndex][0].transcript
        setRecognitionText(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command){
        if(command.includes("open") && command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("opening Youtube")
            setResponse(true)
            setRecognitionText("Opening Youtube...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("google")){
            window.open("https://www.google.com/","_blank")
            speak("Opening Google")
            setResponse(true)
            setRecognitionText("Opening Google...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("facebook")){
            window.open("https://www.facebook.com/","_blank")
            speak("Opening Facebook")
            setResponse(true)
            setRecognitionText("Opening Facebook...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("instagram")){
            window.open("https://www.instagram.com/","_blank")
            speak("Opening Instagram")
            setResponse(true)
            setRecognitionText("Opening Instagram...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("linkedin")){
            window.open("https://www.linkedin.com/","_blank")
            speak("Opening Linkedin")
            setResponse(true)
            setRecognitionText("Opening Linkedin...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("github")){
            window.open("https://github.com/","_blank")
            speak("Opening Github")
            setResponse(true)
            setRecognitionText("Opening Github...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        
        else if(command.includes("open") && command.includes("twitter")){
            window.open("https://x.com/home","_blank")
            speak("Opening Twitter")
            setResponse(true)
            setRecognitionText("Opening Twitter...")
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("time")){
            let time = new Date().toLocaleString(undefined,
                {hour:"numeric",minute:"numeric"}
            )
            speak(time)
            setResponse(true)
            setRecognitionText(time)
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("date")){
            let date = new Date().toLocaleString(undefined,
            {day:"numeric",month:"short"})
            speak(date)
            setResponse(true)
            setRecognitionText(date)
            setTimeout(()=>{
                setSpeaking(false)
            },5000)
        }
        else{
            aiResponse(command)
        }
    }

    let value ={
        recognition,
        speaking,
        setSpeaking,
        recognitionText,
        setRecognitionText,
        response,
        setResponse
    }
  return (
    <div>
        <datacontext.Provider value={value}>
        {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContex