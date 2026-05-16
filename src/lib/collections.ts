// collections.ts — IndexedDB operations for personal problem collections

export interface CollectionItem {
  id: string // `${platform}::${name}`
  name: string
  url: string
  platform: string
  difficulty: string
  keyConcept: string
  topic: string
  addedAt: number
}

export interface Collection {
  id: string // crypto.randomUUID()
  name: string
  createdAt: number
  items: CollectionItem[]
}

const DB_NAME = 'dsa-collections'
const DB_VERSION = 1
const STORE = 'collections'
const DEFAULT_COLLECTION_NAME = 'My Collection'

export function openDB(): Promise<IDBDatabase> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('SSR: IndexedDB not available'))
  }
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error)
  })
}

export async function getCollections(): Promise<Collection[]> {
  if (typeof window === 'undefined') return []
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = (e) => resolve((e.target as IDBRequest<Collection[]>).result ?? [])
    req.onerror = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function createCollection(name: string): Promise<Collection> {
  if (typeof window === 'undefined') {
    return { id: 'ssr', name, createdAt: Date.now(), items: [] }
  }
  const collection: Collection = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    items: [],
  }
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).add(collection)
    req.onsuccess = () => resolve(collection)
    req.onerror = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function addToCollection(
  collectionId: string,
  items: CollectionItem[],
): Promise<void> {
  if (typeof window === 'undefined') return
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const getReq = store.get(collectionId)
    getReq.onsuccess = (e) => {
      const col = (e.target as IDBRequest<Collection>).result
      if (!col) return reject(new Error(`Collection ${collectionId} not found`))
      const existingIds = new Set(col.items.map((i) => i.id))
      const newItems = items.filter((i) => !existingIds.has(i.id))
      col.items = [...col.items, ...newItems]
      const putReq = store.put(col)
      putReq.onsuccess = () => resolve()
      putReq.onerror = (e2) => reject((e2.target as IDBRequest).error)
    }
    getReq.onerror = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function removeFromCollection(
  collectionId: string,
  itemIds: string[],
): Promise<void> {
  if (typeof window === 'undefined') return
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const getReq = store.get(collectionId)
    getReq.onsuccess = (e) => {
      const col = (e.target as IDBRequest<Collection>).result
      if (!col) return reject(new Error(`Collection ${collectionId} not found`))
      const removeSet = new Set(itemIds)
      col.items = col.items.filter((i) => !removeSet.has(i.id))
      const putReq = store.put(col)
      putReq.onsuccess = () => resolve()
      putReq.onerror = (e2) => reject((e2.target as IDBRequest).error)
    }
    getReq.onerror = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function deleteCollection(id: string): Promise<void> {
  if (typeof window === 'undefined') return
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).delete(id)
    req.onsuccess = () => resolve()
    req.onerror = (e) => reject((e.target as IDBRequest).error)
  })
}

export async function getDefaultCollection(): Promise<Collection> {
  if (typeof window === 'undefined') {
    return { id: 'ssr-default', name: DEFAULT_COLLECTION_NAME, createdAt: Date.now(), items: [] }
  }
  const all = await getCollections()
  const existing = all.find((c) => c.name === DEFAULT_COLLECTION_NAME)
  if (existing) return existing
  return createCollection(DEFAULT_COLLECTION_NAME)
}
