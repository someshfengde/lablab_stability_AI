import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  isLoading: boolean;
  inputText: string;
  handleKeyDown: any;
  handleSendMessage: any;
  setInputText: any;
}

export const MessageInput: React.FC<Props> = ({
  isLoading,
  inputText,
  handleKeyDown,
  handleSendMessage,
  setInputText,
}) => {
  const placeholder = "Type your message here.";

  return (
    <div className="flex items-center justify-center">
      <Textarea
        className="w-[100%] resize-none"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="ml-[20px] w-[15%]"
        onClick={handleSendMessage}
        disabled={isLoading}
      >
        Send
      </Button>
    </div>
  );
};
