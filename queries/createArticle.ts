import fetchClient from "@/lib/fetchClient";

export const createArticle = async (data: any) => {
  try {
    if (!data) return

    const response = await fetchClient("articles", data, {}, "POST")

    return response.data
  } catch (error) {
    throw error;
  }
};
