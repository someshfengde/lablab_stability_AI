"use client";

import * as React from "react";
import { useCallback, useState, useRef } from "react";
import { ChatWindow } from "./ChatWindow";
import { MessageInput } from "./MessageInput";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "What coding question you have for me?", sources: "" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatSources = (sources: string) => {
    const sourceList = sources.split(", ");
    const formattedSources = sourceList.map((source: string, index: number) => {
      const sourceName = source
        .replace("converted_texts/", "")
        .replace(".txt", "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
  
      if (sourceList.length === 1) {
        return `Source: "${sourceName}"`;
      } else if (index === sourceList.length - 1) {
        return `and "${sourceName}"`;
      } else {
        return `"${sourceName}", `;
      }
    });
    return sourceList.length > 1 ? "Sources: " + formattedSources.join("") : formattedSources.join("");
  };  
  

  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() !== "" && !isLoading) {
      setIsLoading(true);
      setInputText("");

      const userMessage = { sender: "user", text: inputText.trim(), sources: "" };

      setMessages([...messages, userMessage]);

      const userMessages = messages
        .filter((msg) => msg.sender === "user")
        .map((msg) => msg.text);
      userMessages.push(inputText.trim());

      const assistantMessages = messages
        .filter((msg) => msg.sender === "assistant")
        .map((msg) => msg.text);

      try {
        const response = await fetch("https://6c52-103-123-226-98.ngrok-free.app/generate_stablecode", {
          method: "POST",
          body: JSON.stringify({
            prompt: assistantMessages + "\n\n" + userMessages + "write response in markdown format",
          }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(assistantMessages + "\n\n" + userMessages)
        const responseData = await response.json();
        // const formattedSources = formatSources(responseData.sources);
        const parts = responseData.response.split("###Response");

        // Get the last part of the split
        const lastPart = parts[parts.length - 1];

        // Trim any leading or trailing whitespace
        const trimmedLastPart = lastPart.trim();
        console.log(trimmedLastPart);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "assistant",
            text: trimmedLastPart,
            sources: "",
          },
        ]);        
        
      } catch (error) {
        console.error("Error:", error);
      }

      setIsLoading(false);
    }
  }, [inputText, isLoading, messages]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage();
      event.preventDefault();
    }
  };

  const scrollAreaRef = useRef(null);

  return (
    <section>
      <ChatWindow messages={messages} scrollAreaRef={scrollAreaRef} />
      <MessageInput
        isLoading={isLoading}
        inputText={inputText}
        handleKeyDown={handleKeyDown}
        handleSendMessage={handleSendMessage}
        setInputText={setInputText}
      />
    </section>
  );
}
