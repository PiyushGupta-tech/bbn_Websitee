import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogBySlug } from '../data/blog'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="not-found">
        <h1>Post not found</h1>
        <Link to="/blogs">All posts</Link>
      </div>
    )
  }

  return (
    <article className="prose-page">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <img
          src={post.image}
          alt=""
          style={{ width: '100%', borderRadius: 12, marginBottom: 32, maxHeight: 400, objectFit: 'cover' }}
        />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          {post.title}
        </h1>
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <Link to="/blogs" style={{ display: 'inline-block', marginTop: 24, fontWeight: 600 }}>
          ← Back to blog
        </Link>
      </motion.div>
    </article>
  )
}
