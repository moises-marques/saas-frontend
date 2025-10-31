import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signup() {
  // Estados para armazenar os valores digitados
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()

  // Função para validar o email
  const validateEmail = (email: string) => {
    // Regex simples para email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Função para validar a senha
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  // Valida email em tempo real
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError('Email inválido')
    } else {
      setEmailError('')
    }
  }, [email])

  // Valida senha em tempo real
  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError('Senha precisa ter pelo menos 6 caracteres')
    } else {
      setPasswordError('')
    }
  }, [password])

  // Função chamada ao enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Valida antes de enviar
    if (!validateEmail(email)) {
        setEmailError('Email inválido')
        return
    }
    if (!validatePassword(password)) {
        setPasswordError('Senha precisa ter pelo menos 6 caracteres')
        return
    }

    try {
        // 1️⃣ Cadastro
        await axios.post('http://localhost:8000/signup', { email, password })

        // 2️⃣ Login automático
        const loginRes = await axios.post('http://localhost:8000/login', { email, password })

        // 3️⃣ Salvar token JWT
        localStorage.setItem('token', loginRes.data.access_token)

        // 4️⃣ Redirecionar para dashboard
        router.push('/dashboard')
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail)
        } else {
        setError('Erro desconhecido')
        }
    }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Cadastro</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 mb-2 border rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {emailError && <p className="text-red-600 mb-2">{emailError}</p>}

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 mb-2 border rounded ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {passwordError && <p className="text-red-600 mb-2">{passwordError}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
