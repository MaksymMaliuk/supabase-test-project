'use server'

import { supabase } from "@/utils/supabase/server";

export const createArticle = async (title: string, description: string, url: string) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([{ title, description, url }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
