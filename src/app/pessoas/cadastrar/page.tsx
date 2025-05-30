'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  tipo: string;
}

export default function CadastrarPessoa() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    tipo: ''
  });
  const [erro, setErro] = useState('');

  const tiposPessoa = ['Funcionário', 'Aluno', 'Interessado', 'Empresa'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validação básica
    if (!formData.nome || !formData.cpf || !formData.email || !formData.tipo) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      const response = await fetch('/api/pessoas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.erro || 'Erro ao cadastrar pessoa');
      }

      router.push('/pessoas');
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro('Erro ao cadastrar pessoa');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '64px auto 0' }}>
      <h1 style={{ marginBottom: '20px' }}>Cadastrar Nova Pessoa</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>
            Nome: *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="cpf" style={{ display: 'block', marginBottom: '5px' }}>
            CPF: *
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email: *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="telefone" style={{ display: 'block', marginBottom: '5px' }}>
            Telefone:
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="tipo" style={{ display: 'block', marginBottom: '5px' }}>
            Tipo: *
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Selecione um tipo</option>
            {tiposPessoa.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        {erro && (
          <p style={{ color: 'red', margin: '10px 0' }}>{erro}</p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f4f4f4',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
}; 