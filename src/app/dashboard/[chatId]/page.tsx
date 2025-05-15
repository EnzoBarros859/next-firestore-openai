'use client';

import ChatSidebar from '../../_components/ChatSidebar';
import ChatWindow from '../../_components/ChatWindow';

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatWindow chatId={params.chatId} />
    </div>
  );
} 