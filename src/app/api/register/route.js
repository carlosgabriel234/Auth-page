import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('meubanco');
    const data = await request.json();

    const { name, email, password } = data;

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'Dados incompletos' }), { status: 400 });
    }

    // Verifica se o usuário já existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'E-mail já cadastrado' }), { status: 409 });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Usuário registrado com sucesso!' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Erro no servidor' }), { status: 500 });
  }
}
