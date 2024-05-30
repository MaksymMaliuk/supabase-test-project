'use server'
import fetchClient from "@/lib/fetchClient";

export const getArticle = async (id: string) => {
  try {
    const response = await fetchClient(`articles/${id}`, {}, {}, "GET")

    return response
  } catch (error) {
    throw error
  }
}