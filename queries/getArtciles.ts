'use server'

import { supabase } from "@/utils/supabase/server"

export const getArticles = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    
  return { data, error }
}