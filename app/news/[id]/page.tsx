'use client'

import { Container } from "@/components/Container"
import { getArticle } from "@/queries/getArticle"
import { useParams } from "next/navigation"
import { title } from "process"
import { useEffect, useState } from "react"

export default function Article() {
  const { id = '' } = useParams<{ id: string }>()
  const [article, setArticle] = useState({ title: '', description: '' })

  useEffect(() => {
    getArticle(id)
      .then(data => {
        setArticle({
          title: data.article.title,
          description: data.article.description
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-4 text-center">{article?.title}</h1>

      <div className="flex flex-col gap-4 p-4">
        <p className="text-2xl">{article?.description}</p>
      </div>
    </Container>
  )
}