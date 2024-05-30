import { SupabaseClient, createClient } from "npm:@supabase/supabase-js"
import { Database } from 'supabase/schema.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

const getAllArticles = async (supabaseClient: SupabaseClient<Database>) => {
  const { data: articles, error } = await supabaseClient.from("news").select('*')

  if (error) {
    throw error
  }

  return new Response(JSON.stringify({ articles }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
}

const getArticle = async (supabaseClient: SupabaseClient<Database>, id: string) => {
  const { data: article, error } = await supabaseClient.from("news").select('*').eq("id", id).single()

  if (error) {
    throw error
  }

  return new Response(JSON.stringify({ article }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
}

const deleteArticle = async (supabaseClient: SupabaseClient<Database>, id: string) => {
  const { data: article, error } = await supabaseClient.from("news").delete().eq("id", id)

  if (error) {
    throw error
  }

  return new Response(JSON.stringify({ article }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
}

const createArticle = async (supabaseClient: SupabaseClient<Database>, data: any) => {
  const { error } = await supabaseClient.from("news").insert({
    ...data
  })

  if (error) {
    throw error
  }

  return new Response(JSON.stringify({ data }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
}

const updateArticle = async (supabaseClient: SupabaseClient<Database>, id: string, data: any) => {
  const { data: article, error } = await supabaseClient.from("news").update(data).eq("id", id)

  if (error) {
    throw error
  }

  return new Response(JSON.stringify({ article }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  })
}

console.log("Hello from article function")

Deno.serve(async (req) => {
  const { url, method } = req

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL")!, 
      Deno.env.get("SUPABASE_ANON_KEY")!,

      // UNCOMMENT AFTER IMPLEMENTING AUTHORIZATION

      // {
      //   global: {
      //     headers: {
      //       ...(req.method !== 'GET' && { Authorization: req.headers.get('Authorization')! }),
      //     },
      //   },
      // }
    )
    
    const articlesPattern = new URLPattern({ pathname: "/articles/:id" })
    const matchingPath = articlesPattern.exec(url)
    const id = matchingPath ? matchingPath.pathname.groups.id : null

    let article = null
    if (method === "POST" || method === "PUT") {
      const body = await req.json()

      article = body
    }

    switch (true) {
      case id && method === 'GET':
        return getArticle(supabaseClient, id as string)
      case id && method === 'PUT':
        return updateArticle(supabaseClient, id as string, article)
      case id && method === 'DELETE':
        return deleteArticle(supabaseClient, id as string)
      case method === 'POST':
        return createArticle(supabaseClient, article)
      case method === 'GET':
        return getAllArticles(supabaseClient)
      default:
        return getAllArticles(supabaseClient)
    }
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
