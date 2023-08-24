import { ChatBox } from "@/components/ui/chat/chatBox";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="fixed top-4 left-4">
        <ModeToggle />
      </div>
      <div className="fixed top-4 right-4">
        <UserButton />
      </div>
      <div className="w-full max-w-[800px] px-4">
        <ChatBox />
      </div>
    </section>
  );
}
