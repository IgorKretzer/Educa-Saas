import { NextResponse } from 'next/server';

const pessoas = [
  { id: "1", nome: 'João Silva', cpf: '111.111.111-11', email: 'joao@email.com', telefone: '(11) 99999-9999', tipo: 'Funcionário' },
  { id: "2", nome: 'Maria Santos', cpf: '222.222.222-22', email: 'maria@email.com', telefone: '(11) 88888-8888', tipo: 'Aluno' },
  { id: "3", nome: 'Pedro Souza', cpf: '333.333.333-33', email: 'pedro@email.com', telefone: '(11) 77777-7777', tipo: 'Interessado' },
] as Pessoa[];

// Interface para definir o tipo Pessoa
interface Pessoa {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  tipo: 'Funcionário' | 'Aluno' | 'Interessado' | 'Empresa';
}

// Função para validar os campos obrigatórios
function validarPessoa(pessoa: Partial<Pessoa>): string | null {
  if (!pessoa.nome?.trim()) return 'Nome é obrigatório';
  if (!pessoa.cpf?.trim()) return 'CPF é obrigatório';
  if (!pessoa.email?.trim()) return 'Email é obrigatório';
  if (!pessoa.tipo) return 'Tipo é obrigatório';
  
  const tiposValidos = ['Funcionário', 'Aluno', 'Interessado', 'Empresa'];
  if (!tiposValidos.includes(pessoa.tipo)) return 'Tipo inválido';
  
  return null;
}

// GET - Listar todas as pessoas
export async function GET() {
  return NextResponse.json(pessoas);
}

// POST - Criar uma nova pessoa
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar campos
    const erro = validarPessoa(body);
    if (erro) {
      return NextResponse.json({ erro }, { status: 400 });
    }
    
    // Criar nova pessoa
    const novaPessoa: Pessoa = {
      id: Date.now().toString(),
      nome: body.nome.trim(),
      cpf: body.cpf.trim(),
      email: body.email.trim(),
      telefone: body.telefone?.trim(),
      tipo: body.tipo
    };
    
    pessoas.push(novaPessoa);
    
    return NextResponse.json(novaPessoa, { status: 201 });
  } catch {
    return NextResponse.json(
      { erro: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
} 