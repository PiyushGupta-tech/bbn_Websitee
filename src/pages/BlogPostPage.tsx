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
    <article className="prose-page blog-post-pro">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="blog-pro-eyebrow" style={{ marginBottom: 8 }}>Blog</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginTop: 0 }}>
          {post.title}
        </h1>
        <img src={post.image} alt="" className="blog-post-hero" />
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <Link to="/blogs" className="blog-post-backlink">
          ← Back to blog
        </Link>
      </motion.div>
    </article>
  )
}
