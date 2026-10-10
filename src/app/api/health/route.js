// Health check endpoint — safe, no secrets, no internal DB details exposed
export async function GET() {
  const checks = {
    app: 'ok',
    supabase_url_configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_key_configured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    timestamp: new Date().toISOString(),
  }

  // Try a lightweight DB ping
  let dbStatus = 'unconfigured'
  if (checks.supabase_url_configured && checks.supabase_key_configured) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { error } = await client.from('site_settings').select('id').limit(1)
      dbStatus = error ? `error: ${error.message}` : 'reachable'
    } catch (e) {
      dbStatus = 'unreachable'
    }
  }

  checks.database = dbStatus
  const allOk = checks.app === 'ok' && dbStatus === 'reachable'

  return Response.json(checks, { status: allOk ? 200 : 503 })
}
