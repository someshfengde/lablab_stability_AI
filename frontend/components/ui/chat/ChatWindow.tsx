import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssistantChatCard } from "@/components/ui/chat/assistantChat";
import { UserChatCard } from "@/components/ui/chat/userChat";

interface IMessage {
  sender: string;
  text: string;
  sources?: string;
}

interface ChatWindowProps {
  messages: IMessage[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  scrollAreaRef,
}) => {
  return (
    <ScrollArea className={`mt-[20px] h-[80vh] w-full md:w-[800px] rounded-md border`}>
      <div className="mt-[25px] flex items-center justify-center">
        <h1 className={`text-3xl font-bold gradient-animation-text`}>Ask Stablecode!</h1>
      </div>
      {messages.map((message, index) =>
        message.sender === "assistant" ? (
          <AssistantChatCard key={index} text={message.text} sources={message.sources} />
        ) : (
          <UserChatCard key={index} text={message.text} />
        )
      )}
      <div ref={scrollAreaRef} />
    </ScrollArea>
  );
};
