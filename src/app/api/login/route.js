import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('meubanco');
    const data = await request.json();

    const { email, password } = data;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Dados incompletos' }), { status: 400 });
    }

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Usuário não encontrado' }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Senha incorreta' }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: 'Login realizado com sucesso!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Erro no servidor' }), { status: 500 });
  }
}

