import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const DB_NAME = 'dsa-inventory'
const STORE_NAME = 'solved-problems'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function getSolved(): Promise<Record<string, boolean>> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.getAll()
      req.onsuccess = () => {
        const keysReq = store.getAllKeys()
        keysReq.onsuccess = () => {
          const map: Record<string, boolean> = {}
          const keys = keysReq.result as string[]
          const values = req.result as boolean[]
          for (let i = 0; i < keys.length; i++) map[keys[i]] = values[i]
          resolve(map)
        }
      }
      req.onerror = () => reject(req.error)
      tx.oncomplete = () => db.close()
    })
  } catch {
    return {}
  }
}

async function setSolved(key: string, solved: boolean): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.put(solved, key)
      tx.oncomplete = () => { db.close(); resolve() }
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    // silent fail
  }
}

interface SolvedContextValue {
  solved: Record<string, boolean>
  toggle: (key: string) => Promise<void>
  isSolved: (key: string) => boolean
  solvedCount: number
}

const SolvedContext = createContext<SolvedContextValue>({
  solved: {},
  toggle: async () => {},
  isSolved: () => false,
  solvedCount: 0,
})

export function SolvedProvider({ children }: { children: React.ReactNode }) {
  const [solved, setSolvedState] = useState<Record<string, boolean>>({})

  useEffect(() => {
    getSolved().then(setSolvedState)
  }, [])

  const toggle = useCallback(async (key: string) => {
    const next = !solved[key]
    setSolvedState(prev => ({ ...prev, [key]: next }))
    await setSolved(key, next)
  }, [solved])

  const isSolved = useCallback((key: string) => !!solved[key], [solved])

  const solvedCount = Object.values(solved).filter(Boolean).length

  return (
    <SolvedContext.Provider value={{ solved, toggle, isSolved, solvedCount }}>
      {children}
    </SolvedContext.Provider>
  )
}

export function useSolved() {
  return useContext(SolvedContext)
}

export function SolvedCheckbox({ problemKey }: { problemKey: string }) {
  const { isSolved, toggle } = useSolved()
  const checked = isSolved(problemKey)

  return (
    <label className="gb-solved-checkbox" title={checked ? 'Mark unsolved' : 'Mark solved'}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle(problemKey)}
      />
      <span className={`gb-solved-checkmark${checked ? ' solved' : ''}`}>
        {checked ? '✓' : '○'}
      </span>
      <span className="gb-solved-label">{checked ? 'Solved' : 'Mark solved'}</span>
    </label>
  )
}
