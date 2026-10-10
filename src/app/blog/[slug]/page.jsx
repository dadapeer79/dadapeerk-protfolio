import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function BlogPostPage({ params }) {
  // Since there are no published posts yet, any dynamic route returns 404
  notFound()
  
  return null
}
