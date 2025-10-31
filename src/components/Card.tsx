// frontend/src/components/Card.tsx

import React from 'react';
// IMPORTAÇÃO CORRETA para CSS Modules
import styles from '../styles/Card.module.css'; 


type CardProps = {
  title: string;
  value: string | number;
}

export default function Card({ title, value }: CardProps) {
  return (
    // Aplique a classe usando o objeto 'styles'
    <div className={styles.cardContainer}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardValue}>{value}</p>
    </div>
  );
}