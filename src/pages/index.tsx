// frontend/src/pages/index.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { clearToken } from '../utils/auth' // 👈 usa a função que já existe

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 🔥 limpa o token toda vez que abrir o site
    clearToken()

    // vai direto pro login
    router.replace('/login')
  }, [router])

  return null
}
