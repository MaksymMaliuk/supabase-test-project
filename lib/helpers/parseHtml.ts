import { parseCNN } from "./domainParsers/cnnParser"
import fetchClient from "../fetchClient";
import { parseBBC } from "./domainParsers/bbcParser";

const getExternalNews = async (url: string) => {
  try {
    const response = await fetchClient('get-external-news', { url }, {
      'Content-Type': 'application/json'
    }, 'POST');

    const html = response

    return html
  } catch (error: any) {
    throw error
  }
}

const checkDomain = (url?: string) => {
  if (!url) return
  const hostname = new URL(url).hostname
  return hostname.split('.').slice(-2).join('.')
}

export const parseNews = async (url: string) => {
  const domain = checkDomain(url);

  try {
    const html = await getExternalNews(url);
    switch (domain) {
      case 'cnn.com':
        return parseCNN(html);
      case 'bbc.com':
        return parseBBC(html);
      default:
        return null;
    }
  } catch (error) {
      throw error;
  }
};