'use client';

import Layout from '@/components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindo ao sistema de gestão educacional
          </h1>
          <p className="text-gray-600">
            Utilize o menu superior para navegar entre as funcionalidades do sistema
          </p>
        </div>
      </div>
    </Layout>
  );
} 