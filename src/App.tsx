import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import { BlogIndex } from './pages/BlogIndex'
import { BlogPostPage } from './pages/BlogPostPage'
import { SearchPage } from './pages/SearchPage'
import { CartPage } from './pages/CartPage'
import { StaticDocPage } from './pages/StaticDocPage'
import { FaqPage } from './pages/FaqPage'
import { CouplePairsPage } from './pages/CouplePairsPage'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collections/:categorySlug" element={<CategoryPage />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="blogs" element={<BlogIndex />} />
          <Route path="blogs/:slug" element={<BlogPostPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="pages/couple-pairs" element={<CouplePairsPage />} />
          <Route path="pages/faq" element={<FaqPage />} />
          <Route path="pages/:doc" element={<StaticDocPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}
