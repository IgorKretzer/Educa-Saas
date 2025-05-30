'use client';

import Layout from '@/components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo ao Sistema SaaS Edu
        </h1>
        <p className="mt-4 text-gray-600">
          Utilize o menu superior para navegar entre as funcionalidades do sistema
        </p>
      </div>
    </Layout>
  );
} 