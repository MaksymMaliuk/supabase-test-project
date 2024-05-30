import axios, { AxiosRequestConfig } from "axios"
import { API_URL } from "./consts"

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

const fetchClient = async (
  endpoint: string, 
  data?: any, 
  headers?: any, 
  method: RequestMethod = "GET"
): Promise<any> => {
  const url = `${API_URL}/${endpoint}`

  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers
    }

    const response = await axios(config)
    
    return response.data
  } catch (error) {
    throw error
  }
}

export default fetchClient