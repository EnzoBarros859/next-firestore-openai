'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatSidebar from '../_components/ChatSidebar';
import ChatWindow from '../_components/ChatWindow';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first chat or create a new one
    const redirectToFirstChat = async () => {
      const response = await fetch('/api/chats');
      const data = await response.json();
      
      if (data.chats && data.chats.length > 0) {
        router.push(`/dashboard/${data.chats[0].id}`);
      } else {
        // Create a new chat and redirect to it
        const newChatResponse = await fetch('/api/chats', {
          method: 'POST',
        });
        const newChat = await newChatResponse.json();
        router.push(`/dashboard/${newChat.id}`);
      }
    };

    redirectToFirstChat();
  }, [router]);

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center text-gray-500">
          Select a chat or create a new one
        </div>
      </div>
    </div>
  );
}
