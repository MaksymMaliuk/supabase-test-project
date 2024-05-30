'use client'

import { API_URL } from "@/lib/consts"
import fetchClient from "@/lib/fetchClient"
import axios from "axios"

export const getArticles = async () => {
  try {
    const response = await fetchClient("articles", {}, {}, "GET")
    
    return response
  } catch (error) {
    throw error    
  }
}