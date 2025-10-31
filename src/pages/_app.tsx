// frontend/src/pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Se a rota for '/login' ou a raiz '/', o Layout NÃO deve ser aplicado.
  // Você já estava fazendo essa checagem corretamente.
  if (['/login', '/register', '/'].includes(router.pathname)) {
    // 🔥 Se for Login, apenas retorna o componente (Login.tsx) sem NADA.
    return <Component {...pageProps} />
  }

  // Para todas as outras páginas (Dashboard, Clients, etc.):
  // O componente renderizado (ex: DashboardPage) já vai ter o <Layout> dentro dele!
  // ENTÃO, NÃO ENVOLVA-O AQUI NOVAMENTE!
  
  // A duplicação acontece porque VOCÊ ESTAVA RETORNANDO:
  // <Layout><DashboardPage/></Layout>
  // E o DashboardPage era: <Layout>Conteúdo</Layout>
  
  // Agora, apenas retorne o componente da página.
  return <Component {...pageProps} /> 
  
  // NOTA: Se você decidir mais tarde que o DashboardPage NÃO deve ter o <Layout>
  // (solução ideal), aí sim, você voltaria o <Layout> aqui no _app.tsx, como 
  // sugerido na resposta anterior. Mas por enquanto, para funcionar:
  
  /* CÓDIGO ANTERIOR QUE CAUSAVA DUPLICAÇÃO:
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
  */
}