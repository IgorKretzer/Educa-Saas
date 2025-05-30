'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

interface Pessoa {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  tipo: string;
}

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await fetch('/api/pessoas');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        setPessoas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Listagem de Pessoas</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Novo Cadastro
          </button>
        </div>

        {loading && (
          <div className="text-center py-4">
            <p>Carregando...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pessoas.map((pessoa) => (
                  <tr key={pessoa.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{pessoa.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pessoa.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pessoa.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pessoa.cpf}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pessoa.tipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                      <button className="text-red-600 hover:text-red-800">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
} 