// frontend/src/components/Sidebar.tsx - CÓDIGO ATUALIZADO
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import styles from '../styles/sidebar.module.css'

const navItems = [
  { name: 'Visão Geral', href: '/dashboard' },
  { name: 'Projetos', href: '/projects' },
  { name: 'Clientes', href: '/clients' },
];

export default function Sidebar() {
  const router = useRouter(); // 👈 Hook para acessar informações da rota

  return (
    // Use a mesma classe 'aside' ou 'nav' que funciona no seu layout
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={isActive ? styles.navLinkActive : styles.navLink}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>

  );
}