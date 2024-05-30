import fetchClient from "@/lib/fetchClient"

export const getArticles = async () => {
  try {
    const response = await fetchClient("articles", {}, {}, "GET")
    
    return response
  } catch (error) {
    throw error    
  }
}