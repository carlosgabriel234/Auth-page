'use client';

import styles from '@/app/login/login.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Login realizado com sucesso!');
        router.push('/'); // Redireciona para a home ou dashboard
      } else {
        alert(result.message || 'Email ou senha inválidos');
      }
    } catch (error) {
      console.error(error);
      alert('Erro inesperado');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Entrar na conta</h2>

        <div className={styles.divider}>ou</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            {...register('email', { required: 'E-mail é obrigatório' })}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <label htmlFor="password" className={styles.label}>Senha:</label>
          <input
            type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          <h1 className={styles.click}>
            Não tem uma conta? clique <Link href="/register">aqui</Link>
          </h1>

          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
