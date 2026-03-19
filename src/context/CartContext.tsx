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
import { defaultSizeForProduct } from '../data/productSizes'
import type { Product } from '../data/types'

const STORAGE_V2 = 'bbn-cart-v2'
const STORAGE_V1 = 'bbn-cart-v1'

export interface CartLine {
  productId: string
  size: string
  qty: number
}

function lineKey(line: Pick<CartLine, 'productId' | 'size'>): string {
  return `${line.productId}::${line.size}`
}

function loadInitialCart(): CartLine[] {
  try {
    const v2 = localStorage.getItem(STORAGE_V2)
    if (v2) {
      const parsed = JSON.parse(v2) as unknown
      if (!Array.isArray(parsed)) return []
      return parsed
        .map((row): CartLine | null => {
          if (!row || typeof row !== 'object') return null
          const o = row as Record<string, unknown>
          if (typeof o.productId !== 'string') return null
          const qty = typeof o.qty === 'number' && o.qty >= 1 ? Math.floor(o.qty) : 1
          const size = typeof o.size === 'string' && o.size.trim() ? o.size.trim() : 'Free size'
          return { productId: o.productId, size, qty }
        })
        .filter(Boolean) as CartLine[]
    }
    const v1 = localStorage.getItem(STORAGE_V1)
    if (v1) {
      const old = JSON.parse(v1) as { productId: string; qty: number }[]
      if (!Array.isArray(old)) return []
      return old.map((row) => ({
        productId: row.productId,
        size: 'Free size',
        qty: typeof row.qty === 'number' && row.qty >= 1 ? Math.floor(row.qty) : 1,
      }))
    }
  } catch {
    /* ignore */
  }
  return []
}

export interface AddToCartOptions {
  qty?: number
  size?: string
}

interface CartContextValue {
  items: CartLine[]
  addToCart: (productId: string, options?: AddToCartOptions) => void
  removeFromCart: (productId: string, size: string) => void
  setQty: (productId: string, size: string, qty: number) => void
  clearCart: () => void
  totalQty: number
  subtotal: number
  linesWithProduct: { line: CartLine; product: Product }[]
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(loadInitialCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_V2, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const addToCart = useCallback((productId: string, options?: AddToCartOptions) => {
    const product = products.find((p) => p.id === productId)
    const size = options?.size ?? (product ? defaultSizeForProduct(product) : 'M')
    const qty = options?.qty ?? 1
    const add = qty < 1 ? 1 : Math.floor(qty)

    setItems((prev) => {
      const i = prev.findIndex((l) => l.productId === productId && l.size === size)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + add }
        return next
      }
      return [...prev, { productId, size, qty: add }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)))
  }, [])

  const setQty = useCallback((productId: string, size: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)))
      return
    }
    const q = Math.floor(qty)
    setItems((prev) =>
      prev.map((l) => (l.productId === productId && l.size === size ? { ...l, qty: q } : l))
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

/** Stable key for React lists */
export function cartLineKey(line: CartLine): string {
  return lineKey(line)
}
