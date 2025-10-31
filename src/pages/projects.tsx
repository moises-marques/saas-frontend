import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/projects.module.css'
import axios from 'axios'

interface Project {
  id: number
  name: string
  description: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // Carregar projetos
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8000/projects')
      setProjects(res.data)
    } catch (err) {
      console.error('Erro ao buscar projetos:', err)
    }
  }

  const handleAddProject = async () => {
    if (!name.trim()) return
    try {
      await axios.post('http://localhost:8000/projects', { name, description })
      setName('')
      setDescription('')
      fetchProjects()
    } catch (err) {
      console.error('Erro ao adicionar projeto:', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/projects/${id}`)
      fetchProjects()
    } catch (err) {
      console.error('Erro ao deletar projeto:', err)
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Projetos</h1>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddProject}>Adicionar Projeto</button>
        </div>

        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <p>{project.description}</p>
              </div>
              <button onClick={() => handleDelete(project.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
