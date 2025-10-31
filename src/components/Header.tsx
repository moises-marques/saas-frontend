// frontend/src/components/Header.tsx
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

type Props = {
  email?: string
}

export default function Header({ email }: Props) {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
  <header className={styles.header}>
    <div className={styles.headerInfo}>
      <h2>Meu SaaS</h2>
      {email && <p>Logado como {email}</p>}
    </div>

    <div className={styles.headerButtons}>
      <button
        onClick={() => router.push('/dashboard')}
        className={`${styles.button} ${styles.buttonDashboard}`}
      >
        Dashboard
      </button>
      <button
        onClick={handleLogout}
        className={`${styles.button} ${styles.buttonLogout}`}
      >
        Logout
      </button>
    </div>
  </header>
)

}
