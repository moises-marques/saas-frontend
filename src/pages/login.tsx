import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { saveToken } from '../utils/auth'
import styles from '../styles/login.module.css'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // 🔹 Cria o corpo da requisição em formato form-data
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      // 🔹 Faz o POST pro backend
      const res = await axios.post("http://localhost:8000/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // 🔹 Salva o token e redireciona
      saveToken(res.data.access_token)
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err)
      setError("E-mail ou senha inválidos.")
    }
  }

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles['login-form']}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="username"        
            autoComplete="email"   
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="current-password" 
            autoComplete="current-password" 
          />
          <button type="submit">Entrar</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  )
}
