'use client';

import ChatWindow from '../../_components/ChatWindow';

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return <ChatWindow chatId={params.chatId} />;
} 