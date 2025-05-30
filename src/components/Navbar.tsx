'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            SaaS Edu
          </Link>
          
          <div className="flex space-x-6">
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center hover:text-gray-300">
                ⚙️ Cadastros
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    href="/pessoas"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Cadastro de Pessoas
                  </Link>
                </div>
              )}
            </div>
            <button className="hover:text-gray-300">📚 Pedagógico</button>
            <button className="hover:text-gray-300">💰 Financeiro</button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
} 