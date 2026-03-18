import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog'

export function BlogIndex() {
  return (
    <div className="section container">
      <h1 className="section-title">Blog</h1>
      <div className="blog-grid">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/blogs/${post.slug}`}>
              <div className="blog-card-img">
                <img src={post.image} alt="" />
              </div>
              <div className="blog-card-body">
                <h2 style={{ fontSize: 17, marginBottom: 12 }}>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
