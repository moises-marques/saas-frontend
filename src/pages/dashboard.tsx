// frontend/src/pages/dashboard.tsx - CÓDIGO CORRIGIDO E COMPLETO
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { useRouter } from 'next/router'
import { isAuthenticated, clearToken } from '../utils/auth'
import Layout from '../layout/Layout'
import styles from '../styles/dashboard.module.css'



type User = {
  id: number
  email: string
  is_active: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // verifica se o usuário está autenticado
    if (!isAuthenticated()) {
      // se não estiver, limpa o token e redireciona pro login
      localStorage.removeItem('token')
      router.replace('/login')
    }
  }, [router])

  // função para buscar /me com token
  async function fetchMe() {
    setLoading(true)
    setError('')
    const token = localStorage.getItem('token')
    if (!token) {
      // se não tiver token, manda para login
      router.push('/login')
      return
    }

    try {
      const res = await axios.get('http://localhost:8000/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
    } catch (err: any) {
      console.error(err)
      setError('Erro ao buscar usuário. Faça login novamente.')
      // se token inválido, limpar e redirecionar
      localStorage.removeItem('token')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // 👇 impede que o layout (ou o login) apareça enquanto carrega o token
  if (loading) return null
  if (!user) return null  // 👈 impede layout se não tiver usuário
  
  
  // 🎯 RETORNO FINAL: Apenas o CONTEÚDO envolto pelo Layout global
 return (
    <Layout email={user.email}>
      <div className={styles['dashboard-container']}>
        <h1 className={styles['dashboard-header']}>Visão Geral</h1>

        <div className={styles['cards-grid']}>
          <Card title="Usuários cadastrados" value="42" />
          <Card title="Projetos ativos" value="7" />
          <Card title="Receita (mês)" value="R$ 12.345" />
        </div>

        <div className={styles.activities}>
          <h2>Últimas atividades</h2>
          <ul>
            <li>🟢 Projeto X criado por {user.email}</li>
            <li>🟢 Nova fatura gerada</li>
            <li>🟠 Tarefa Y atualizada</li>
          </ul>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </Layout>
  )

}