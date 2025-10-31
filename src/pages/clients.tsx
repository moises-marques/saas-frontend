import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/clients.module.css'
import axios from 'axios'

interface Client {
  id: number
  name: string
  email: string
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await axios.get('http://localhost:8000/clients')
      setClients(res.data)
    } catch (err) {
      console.error('Erro ao buscar clientes:', err)
    }
  }

  const handleAddClient = async () => {
    if (!name.trim() || !email.trim()) return
    try {
      await axios.post('http://localhost:8000/clients', { name, email })
      setName('')
      setEmail('')
      fetchClients()
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/clients/${id}`)
      fetchClients()
    } catch (err) {
      console.error('Erro ao deletar cliente:', err)
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Clientes</h1>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleAddClient}>Adicionar Cliente</button>
        </div>

        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client.id}>
              <div>
                <strong>{client.name}</strong>
                <p>{client.email}</p>
              </div>
              <button onClick={() => handleDelete(client.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
