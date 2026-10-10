// Server-side URL metadata import — safe, no client secrets
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return Response.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    new URL(url) // validate
  } catch {
    return Response.json({ error: 'Invalid URL' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DKPortfolio/1.0 (metadata fetch)' },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const html = await res.text()

    // Extract meta tags safely
    const getTag = (pattern) => {
      const m = html.match(pattern)
      return m ? m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : null
    }

    const title =
      getTag(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i) ||
      getTag(/<meta[^>]+name="og:title"[^>]+content="([^"]+)"/i) ||
      getTag(/<title[^>]*>([^<]+)<\/title>/i) ||
      null

    const description =
      getTag(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) ||
      getTag(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ||
      null

    const slug = title
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 80)
      : null

    return Response.json({ title, description, slug, url })
  } catch (err) {
    if (err.name === 'AbortError') {
      return Response.json({ error: 'Request timed out. The URL may be slow or unreachable.' }, { status: 408 })
    }
    return Response.json({ error: 'Could not fetch metadata from this URL. You can fill in details manually.' }, { status: 422 })
  }
}
