'use client'

import { parseNews } from "@/lib/helpers/parseHtml"
import { createArticle } from "@/queries/createArticle";
import { useEffect, useState } from "react";
import './index.css'
import { Container } from "@/components/Container";
import useDebounce from "@/hooks/useDebounce";

interface NewsData {
  title: string | undefined
  description: string | undefined
  url: string
}

export default function AddNews() {
  const [newsData, setNewsData] = useState<NewsData | undefined>(undefined)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const debouncedUrl = useDebounce(url, 500);

  useEffect(() => {
    if (debouncedUrl) {
      setLoading(true)

      parseNews(debouncedUrl)
        .then(res => {
          setNewsData({
            title: res?.title.trim(),
            description: res?.description.trim(),
            url: debouncedUrl
          })
  
          setError('')
        })
        .catch(error => {
          setError(error.message)
        })
        .finally(() => setLoading(false))
    }

  }, [debouncedUrl])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (newsData?.title && newsData?.description && newsData?.url) {
      await createArticle(newsData.title, newsData.description, newsData.url);
    }

    setSubmitting(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setError('')
  }

  return (
    <div className="add-news-page">
      <form onSubmit={handleSubmit} className="add-news-form flex flex-col gap-4 max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Add News
        </h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="url">Input URL here:</label>

          <input
            className="border-2 border-gray-300 rounded-md p-2" 
            type="text" 
            id="url" 
            name="url" 
            value={url} 
            onChange={onChange}
          />

          {error && <p className="text-red-500">{error}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

        {loading
          ? <Container>
              <p>Loading...</p>
            </Container>
          : <Container>
              <div className="text-xl mb-2">
                Article title:
              </div>

              <h1 className="text-2xl font-bold mb-4">
                {newsData?.title}
              </h1>

              <div className="mt-4">
                <div className="text-xl mb-6">
                  Article description:
                </div>

                <p style={{ overflow: 'auto', maxHeight: '500px' }}>
                  {newsData?.description}
                </p>
              </div>
            </Container>
        }
    </div>
  )
}