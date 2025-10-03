import Image from "next/image";
import { useState, useEffect } from "react";

const ShimmerMessages = () => {
    const messages = [
        "Loading your assistant's response...",
        "Generating insights...",
        "Analyzing input...",
        "Cooking up something special...",
        "Just a moment, almost there...",
        "meanwhile you can grab a coffee...",
        "AI is always slow, you know...",
        "OMG, this AI needs to be Optimized...",
        "wanna sing a song while waiting?",
        "I love waiting, said no one ever...",
        "Good things come to those who wait...",
        "Patience is a virtue, they say...",
        "This is taking longer than expected...",
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(()=>{setCurrentMessageIndex((prev)=>(prev+1)%messages.length)},2000)
    return ()=> clearInterval(interval);
    },[messages.length]);
    
    return (
        <div className="flex items-center gap-2">
            <span className = "text-base text-muted-foreground animate-pulse">
                {messages[currentMessageIndex]}
            </span>
        </div>
    ); 
};

export const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image 
                src="/logo.png"
                alt="Webgod AI Logo"
                width={24}
                height={24}
                className="shrink-0"
                />
                <span className="text-sm font-medium">WEBGOD AI</span>
            </div>
            <div className="pl-8.5 flex flex-col gap-y-4">
                <ShimmerMessages />
            </div>
        </div>
    )
}