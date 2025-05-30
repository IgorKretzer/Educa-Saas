'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-20 px-4">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 