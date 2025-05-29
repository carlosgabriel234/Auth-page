'use client';

import styles from '@/app/register/register.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Erro ao cadastrar.');
        return;
      }

      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro inesperado.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Criar Conta</h2>

       

     

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className={styles.label}>Nome completo:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <label htmlFor="email" className={styles.label}>E-mail:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'E-mail é obrigatório' })}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}

          <label htmlFor="password" className={styles.label}>Senha:</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres',
              },
            })}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          <label htmlFor="confirmPassword" className={styles.label}>Confirmar senha:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Confirmação obrigatória',
              validate: (value) =>
                value === password || 'As senhas não coincidem',
            })}
            className={styles.input}
          />
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}

          <h1 className={styles.click}>
            já tem uma conta? clique <Link href="/login">aqui</Link>
          </h1>

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

   