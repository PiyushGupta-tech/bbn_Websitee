import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog'

export function BlogIndex() {
  return (
    <section className="blog-pro-section">
      <div className="blog-pro-bg" aria-hidden />
      <div className="section container blog-pro-inner">
        <header className="blog-pro-header">
          <p className="blog-pro-eyebrow">Editorial</p>
          <h1 className="section-title">bbn Journal</h1>
          <p className="blog-pro-lead">
            Style notes, buying guides, and festive edit ideas from the bbn team.
          </p>
        </header>
        <div className="blog-grid blog-grid--pro">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            className="blog-card blog-card--pro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/blogs/${post.slug}`}>
              <div className="blog-card-img">
                <img src={post.image} alt="" />
              </div>
              <div className="blog-card-body">
                <h2 className="blog-pro-title">{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="blog-pro-readmore">Read article →</span>
              </div>
            </Link>
          </motion.article>
        ))}
        </div>
      </div>
    </section>
  )
}
