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
import { PaymentCheckoutPage } from './pages/PaymentCheckoutPage'
import { PaymentInitiatePage } from './pages/PaymentInitiatePage'
import { PaymentCompletePage } from './pages/PaymentCompletePage'
import { PaymentReturnPage } from './pages/PaymentReturnPage'
import { OrderConfirmationPage } from './pages/OrderConfirmationPage'
import { WishlistPage } from './pages/WishlistPage'
import { StaticDocPage } from './pages/StaticDocPage'
import { FaqPage } from './pages/FaqPage'
import { CouplePairsPage } from './pages/CouplePairsPage'
import { NotFound } from './pages/NotFound'
import { AuthPage } from './pages/AuthPage'
import { AccountPage } from './pages/AccountPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'

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
              <Route path="checkout/payment" element={<PaymentCheckoutPage />} />
              <Route path="checkout/payment/online" element={<PaymentInitiatePage />} />
              <Route path="checkout/payment/complete" element={<PaymentCompletePage />} />
              <Route path="checkout/payment/return" element={<PaymentReturnPage />} />
              <Route path="payment/status" element={<PaymentReturnPage />} />
              <Route path="payment/return" element={<PaymentReturnPage />} />
              <Route path="payment" element={<PaymentReturnPage />} />
              <Route path="checkout/thanks" element={<OrderConfirmationPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="signup" element={<AuthPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="admin/login" element={<AdminLoginPage />} />
              <Route path="admin" element={<AdminDashboardPage />} />
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
