'use client';

import ChatSidebar from '../_components/ChatSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      {children}
    </div>
  );
}