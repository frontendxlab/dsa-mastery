// CollectionProvider.tsx — React Context for problem collection state

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Collection, CollectionItem } from '../lib/collections'
import {
  addToCollection,
  createCollection,
  getCollections,
} from '../lib/collections'
import CollectionBar from './CollectionBar'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CollectionContextValue {
  // Selection (ephemeral, in-memory)
  selected: Map<string, CollectionItem>
  toggleSelect: (item: CollectionItem) => void
  selectMany: (items: CollectionItem[]) => void
  clearSelection: () => void
  isSelected: (id: string) => boolean

  // Collections (persisted to IndexedDB)
  collections: Collection[]
  refreshCollections: () => void
  addSelectedToCollection: (collectionId: string) => Promise<void>
  createAndAddSelected: (name: string) => Promise<void>

  // Drawer visibility
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

// ─── Context ─────────────────────────────────────────────────────────────────

export const CollectionContext = createContext<CollectionContextValue>({
  selected: new Map(),
  toggleSelect: () => {},
  selectMany: () => {},
  clearSelection: () => {},
  isSelected: () => false,
  collections: [],
  refreshCollections: () => {},
  addSelectedToCollection: async () => {},
  createAndAddSelected: async () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
})

// ─── Provider ────────────────────────────────────────────────────────────────

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Map<string, CollectionItem>>(new Map())
  const [collections, setCollections] = useState<Collection[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMounted = useRef(false)

  // Load collections from IndexedDB on client mount only
  useEffect(() => {
    isMounted.current = true
    if (typeof window === 'undefined') return
    getCollections().then(setCollections).catch(console.error)
    return () => {
      isMounted.current = false
    }
  }, [])

  const refreshCollections = useCallback(() => {
    if (typeof window === 'undefined') return
    getCollections()
      .then((cols) => {
        if (isMounted.current) setCollections(cols)
      })
      .catch(console.error)
  }, [])

  const toggleSelect = useCallback((item: CollectionItem) => {
    setSelected((prev) => {
      const next = new Map(prev)
      if (next.has(item.id)) {
        next.delete(item.id)
      } else {
        next.set(item.id, item)
      }
      return next
    })
  }, [])

  const selectMany = useCallback((items: CollectionItem[]) => {
    setSelected((prev) => {
      const next = new Map(prev)
      for (const item of items) next.set(item.id, item)
      return next
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelected(new Map())
  }, [])

  const isSelected = useCallback(
    (id: string) => selected.has(id),
    [selected],
  )

  const addSelectedToCollection = useCallback(
    async (collectionId: string) => {
      if (selected.size === 0) return
      const now = Date.now()
      const items: CollectionItem[] = Array.from(selected.values()).map((i) => ({
        ...i,
        addedAt: now,
      }))
      await addToCollection(collectionId, items)
      refreshCollections()
      clearSelection()
    },
    [selected, refreshCollections, clearSelection],
  )

  const createAndAddSelected = useCallback(
    async (name: string) => {
      const col = await createCollection(name)
      if (selected.size > 0) {
        const now = Date.now()
        const items: CollectionItem[] = Array.from(selected.values()).map((i) => ({
          ...i,
          addedAt: now,
        }))
        await addToCollection(col.id, items)
      }
      refreshCollections()
      clearSelection()
    },
    [selected, refreshCollections, clearSelection],
  )

  const value: CollectionContextValue = {
    selected,
    toggleSelect,
    selectMany,
    clearSelection,
    isSelected,
    collections,
    refreshCollections,
    addSelectedToCollection,
    createAndAddSelected,
    drawerOpen,
    setDrawerOpen,
  }

  return (
    <CollectionContext.Provider value={value}>
      {children}
      {selected.size > 0 && <CollectionBar />}
    </CollectionContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCollection(): CollectionContextValue {
  return useContext(CollectionContext)
}
