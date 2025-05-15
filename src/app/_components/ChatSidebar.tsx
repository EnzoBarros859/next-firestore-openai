import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

interface Chat {
  id: string;
  title: string;
  createdAt: any;
}

export default function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];
      setChats(chatList);
    });

    return () => unsubscribe();
  }, []);

  const createNewChat = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        title: 'New Chat',
        createdAt: serverTimestamp(),
      });
      router.push(`/dashboard/${docRef.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <button
        onClick={createNewChat}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/dashboard/${chat.id}`)}
            className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer mb-2"
          >
            <p className="truncate">{chat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 