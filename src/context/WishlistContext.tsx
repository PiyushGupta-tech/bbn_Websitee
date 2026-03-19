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

const STORAGE = 'bbn-wishlist-v1'

interface WishlistContextValue {
  ids: string[]
  count: number
  toggle: (productId: string) => void
  remove: (productId: string) => void
  has: (productId: string) => boolean
  items: Product[]
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

function loadIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(loadIds)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(ids))
  }, [ids])

  const toggle = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }, [])

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId))
  }, [])

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids]
  )

  const value = useMemo(() => {
    const items = ids
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean) as Product[]
    return {
      ids,
      count: ids.length,
      toggle,
      remove,
      has,
      items,
    }
  }, [ids, toggle, remove, has])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
