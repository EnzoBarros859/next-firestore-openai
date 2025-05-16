import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/firebase/auth';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Chat {
  id: string;
  title: string;
  createdAt: any;
}

export default function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const editInputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Chat[];
      setChats(chatList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openNewChatModal = () => {
    setIsModalOpen(true);
    setNewChatTitle('');
    setTimeout(() => {
      modalInputRef.current?.focus();
    }, 0);
  };

  const createNewChat = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        title: newChatTitle.trim() || 'New Chat',
        createdAt: serverTimestamp(),
      });
      setIsModalOpen(false);
      router.push(`/dashboard/${docRef.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const startEditing = (chat: Chat) => {
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
    setTimeout(() => {
      editInputRef.current?.focus();
    }, 0);
  };

  const saveChatTitle = async (chatId: string) => {
    try {
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        title: editingTitle.trim() || 'New Chat'
      });
      setEditingChatId(null);
    } catch (error) {
      console.error('Error updating chat title:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, chatId: string) => {
    if (e.key === 'Enter') {
      saveChatTitle(chatId);
    } else if (e.key === 'Escape') {
      setEditingChatId(null);
    }
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createNewChat();
    } else if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <button
        onClick={openNewChatModal}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : chats.length === 0 ? (
          // Empty state
          <div className="text-center text-gray-400 py-8">
            <p>No chats yet</p>
            <p className="text-sm mt-2">Create a new chat to get started</p>
          </div>
        ) : (
          // Chat list
          chats.map((chat) => (
            <div
              key={chat.id}
              className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer mb-2 group"
            >
              {editingChatId === chat.id ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => saveChatTitle(chat.id)}
                  onKeyDown={(e) => handleKeyDown(e, chat.id)}
                  className="w-full bg-gray-600 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div 
                  className="flex items-center justify-between"
                  onClick={() => router.push(`/dashboard/${chat.id}`)}
                >
                  <p className="truncate flex-1">{chat.title}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(chat);
                    }}
                    className="opacity-0 group-hover:opacity-100 ml-2 text-gray-400 hover:text-white transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* User Profile Section */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-lg font-semibold">
                {user?.displayName?.[0] || user?.email?.[0] || '?'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.displayName || user?.email || 'User'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* New Chat Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Chat</h2>
            <input
              ref={modalInputRef}
              type="text"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              onKeyDown={handleModalKeyDown}
              placeholder="Enter chat name"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createNewChat}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 