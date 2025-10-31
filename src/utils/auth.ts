// frontend/src/utils/auth.ts

// Salva o token no localStorage
export const saveToken = (token: string) => {
  localStorage.setItem('token', token)
}

// Pega o token
export const getToken = () => {
  return localStorage.getItem('token')
}

// Apaga o token (logout)
export const clearToken = () => {
  localStorage.removeItem('token')
}

// Verifica se está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
