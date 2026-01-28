import "server-only"

import { createClient } from "@supabase/supabase-js"

import { createMockSupabaseClient } from "@/lib/supabase/mock-data"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const isDevLike = process.env.NODE_ENV !== "production"
const hasSupabaseEnv = Boolean(supabaseUrl && supabaseServiceRoleKey)

export const createSupabaseServerClient = () => {
  if (!hasSupabaseEnv) {
    if (isDevLike) {
      return createMockSupabaseClient()
    }

    throw new Error(
      "Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    )
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  })
}
