import axios from "axios"
import { parseCNN } from "./domainParsers/cnnParser"

const getExternalNews = async (url: string) => {
  try {
    const response = await axios.get(url)
    const html = response.data

    return html
  } catch (error: any) {
    throw new Error(`Error fetching external news: ${error.message}`);
  }
}

const checkDomain = (url?: string) => {
  if (!url) return
  const hostname = new URL(url).hostname
  return hostname.split('.').slice(-2).join('.')
}

export const parseNews = async (url: string) => {
  const domain = checkDomain(url)
  const html = await getExternalNews(url)

  switch (domain) {
    case 'cnn.com':
      return parseCNN(html)
    default:
      return null
  }
}
