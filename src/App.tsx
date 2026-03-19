import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CategoryPage } from './pages/CategoryPage'
import { AllProductsPage } from './pages/AllProductsPage'
import { ProductPage } from './pages/ProductPage'
import { BlogIndex } from './pages/BlogIndex'
import { BlogPostPage } from './pages/BlogPostPage'
import { SearchPage } from './pages/SearchPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { WishlistPage } from './pages/WishlistPage'
import { StaticDocPage } from './pages/StaticDocPage'
import { FaqPage } from './pages/FaqPage'
import { CouplePairsPage } from './pages/CouplePairsPage'
import { NotFound } from './pages/NotFound'
import { AuthPage } from './pages/AuthPage'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<AllProductsPage />} />
              <Route path="collections/all" element={<AllProductsPage />} />
              <Route path="collections/:categorySlug" element={<CategoryPage />} />
              <Route path="products/:slug" element={<ProductPage />} />
              <Route path="blogs" element={<BlogIndex />} />
              <Route path="blogs/:slug" element={<BlogPostPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout/thanks" element={<OrderConfirmationPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="signup" element={<AuthPage />} />
              <Route path="pages/couple-pairs" element={<CouplePairsPage />} />
              <Route path="pages/faq" element={<FaqPage />} />
              <Route path="pages/:doc" element={<StaticDocPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
