'use client'

import { API_URL } from "@/lib/consts";
import fetchClient from "@/lib/fetchClient";
import axios from "axios";

export const createArticle = async (data: any) => {
  try {
    if (!data) return

    const response = await fetchClient("articles", data, {}, "POST")

    return response.data
  } catch (error) {
    throw error;
  }
};
