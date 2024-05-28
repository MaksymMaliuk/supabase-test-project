'use server'
import { supabase } from "@/utils/supabase/server";

export const getArticle = async (id: string) => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}