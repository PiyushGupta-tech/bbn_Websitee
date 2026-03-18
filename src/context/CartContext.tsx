import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products } from '../data/products'
import type { Product } from '../data/types'

const STORAGE = 'bbn-cart-v1'

export interface CartLine {
  productId: string
  qty: number
}

interface CartContextValue {
  items: CartLine[]
  addToCart: (productId: string, qty?: number) => void
  removeFromCart: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clearCart: () => void
  totalQty: number
  subtotal: number
  linesWithProduct: { line: CartLine; product: Product }[]
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE)
      if (raw) return JSON.parse(raw) as CartLine[]
    } catch {
      /* ignore */
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((l) => l.productId === productId)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + qty }
        return next
      }
      return [...prev, { productId, qty }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((l) => l.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, qty } : l))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const linesWithProduct = items
      .map((line) => {
        const product = products.find((p) => p.id === line.productId)
        return product ? { line, product } : null
      })
      .filter(Boolean) as { line: CartLine; product: Product }[]

    const subtotal = linesWithProduct.reduce(
      (s, { line, product }) => s + product.price * line.qty,
      0
    )
    const totalQty = items.reduce((s, l) => s + l.qty, 0)

    return {
      items,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      totalQty,
      subtotal,
      linesWithProduct,
    }
  }, [items, addToCart, removeFromCart, setQty, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart inside CartProvider')
  return ctx
}
