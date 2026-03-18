import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog'

export function BlogTeaser() {
  return (
    <section className="section container">
      <h2 className="section-title">Check Our Blog Posts</h2>
      <div className="blog-grid">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            className="blog-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/blogs/${post.slug}`}>
              <div className="blog-card-img">
                <img src={post.image} alt="" loading="lazy" />
              </div>
              <div className="blog-card-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
