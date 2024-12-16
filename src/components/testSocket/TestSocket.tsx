"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL);

export default function TestSocket() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Array<string>>([]);

  const submit = async () => {
    if (!inputValue.trim()) {
      alert("Please enter a message");
      return;
    }
      socket.emit("message", {message : inputValue});
      setInputValue(""); 
  };

  useEffect(()=>{
    const handleSetMessage = ({message} : {message : string}) =>{
        setMessages((prev)=>[...prev, message])
    }
    socket.on('message',handleSetMessage)
    return ()=>{
      socket.off('message',handleSetMessage)
    }

  },[])

  return (
    <div className="h-screen p-8">
      <h1>Test Socket Connection: {process.env.NEXT_PUBLIC_API_SOCKET_URL}</h1>

      {/* Message Input */}
      <div className="mt-4">
        <input
          className="border border-gray-500 p-2 w-80"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={submit} className="bg-red-500 text-white p-2 ml-2">
          Send
        </button>
      </div>

      <br/>
      <div>
         {messages && messages.length > 0 &&
         messages.map((message, index)=>(
          <div key={index} className="py-4 border-b">
            <p>ข้อความที่ : {index+1}</p>
            {message}
          </div>
         ))
         }
      </div>
    </div>
  );
}
