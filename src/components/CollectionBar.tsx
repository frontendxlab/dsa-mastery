// CollectionBar.tsx — Floating action bar for problem collection management

import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteCollection } from '../lib/collections'
import { useCollection } from './CollectionProvider'

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
@keyframes cb-slide-up {
  from { opacity: 0; transform: translateX(-50%) translateY(24px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.cb-bar {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #10121f;
  border: 1px solid rgba(214,235,253,0.09);
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(59,158,255,0.08);
  animation: cb-slide-up 0.22s cubic-bezier(0.23,1,0.32,1) forwards;
  white-space: nowrap;
}

.cb-count {
  font-size: 13px;
  font-weight: 600;
  color: #c8d8f0;
  padding: 0 6px;
  letter-spacing: -0.01em;
}

.cb-sep {
  width: 1px;
  height: 20px;
  background: rgba(214,235,253,0.09);
  flex-shrink: 0;
}

.cb-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  background: transparent;
  color: #c8d8f0;
  letter-spacing: -0.01em;
}

.cb-btn:hover {
  background: rgba(214,235,253,0.06);
  border-color: rgba(214,235,253,0.1);
}

.cb-btn-primary {
  background: rgba(59,158,255,0.15);
  border-color: rgba(59,158,255,0.28);
  color: #3b9eff;
}

.cb-btn-primary:hover {
  background: rgba(59,158,255,0.22);
  border-color: rgba(59,158,255,0.4);
}

.cb-btn-clear {
  color: rgba(200,216,240,0.5);
  font-size: 12px;
  padding: 7px 8px;
}

.cb-btn-clear:hover {
  color: #e05252;
  background: rgba(224,82,82,0.08);
  border-color: rgba(224,82,82,0.15);
}

/* Dropdown */
.cb-dropdown-wrap {
  position: relative;
}

.cb-dropdown {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  background: #10121f;
  border: 1px solid rgba(214,235,253,0.1);
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.6);
  overflow: hidden;
  z-index: 210;
}

.cb-dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 9px 14px;
  font-size: 13px;
  color: #c8d8f0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.12s;
  letter-spacing: -0.01em;
}

.cb-dropdown-item:hover {
  background: rgba(214,235,253,0.06);
}

.cb-dropdown-item-new {
  color: #3b9eff;
  border-top: 1px solid rgba(214,235,253,0.07);
}

.cb-dropdown-item-new:hover {
  background: rgba(59,158,255,0.08);
}

/* Drawer overlay */
.cb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  z-index: 300;
  backdrop-filter: blur(3px);
  animation: cb-fade-in 0.18s ease forwards;
}

@keyframes cb-fade-in {
  from { opacity: 0; } to { opacity: 1; }
}

.cb-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: min(420px, 100vw);
  background: #0c0e1a;
  border-left: 1px solid rgba(214,235,253,0.08);
  z-index: 310;
  display: flex;
  flex-direction: column;
  animation: cb-slide-in 0.22s cubic-bezier(0.23,1,0.32,1) forwards;
  overflow: hidden;
}

@keyframes cb-slide-in {
  from { transform: translateX(100%); } to { transform: translateX(0); }
}

.cb-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 16px;
  border-bottom: 1px solid rgba(214,235,253,0.07);
  flex-shrink: 0;
}

.cb-drawer-title {
  font-size: 15px;
  font-weight: 700;
  color: #e8eaf0;
  letter-spacing: -0.02em;
}

.cb-drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(214,235,253,0.08);
  background: transparent;
  color: rgba(200,216,240,0.5);
  cursor: pointer;
  font-size: 16px;
  transition: background 0.12s, color 0.12s;
}

.cb-drawer-close:hover {
  background: rgba(214,235,253,0.06);
  color: #c8d8f0;
}

.cb-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.cb-drawer-body::-webkit-scrollbar { width: 4px; }
.cb-drawer-body::-webkit-scrollbar-track { background: transparent; }
.cb-drawer-body::-webkit-scrollbar-thumb { background: rgba(214,235,253,0.12); border-radius: 4px; }

.cb-collection-block {
  margin-bottom: 20px;
  border: 1px solid rgba(214,235,253,0.07);
  border-radius: 10px;
  overflow: hidden;
}

.cb-collection-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(214,235,253,0.03);
  border-bottom: 1px solid rgba(214,235,253,0.06);
}

.cb-collection-name {
  font-size: 13px;
  font-weight: 600;
  color: #c8d8f0;
  letter-spacing: -0.01em;
}

.cb-collection-count {
  font-size: 11px;
  color: rgba(200,216,240,0.4);
  background: rgba(214,235,253,0.05);
  padding: 2px 7px;
  border-radius: 20px;
}

.cb-collection-del {
  background: transparent;
  border: none;
  color: rgba(200,216,240,0.3);
  cursor: pointer;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.12s, background 0.12s;
  margin-left: 8px;
}

.cb-collection-del:hover {
  color: #e05252;
  background: rgba(224,82,82,0.1);
}

.cb-item-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 14px;
  border-bottom: 1px solid rgba(214,235,253,0.04);
  transition: background 0.1s;
}

.cb-item-row:last-child { border-bottom: none; }
.cb-item-row:hover { background: rgba(214,235,253,0.03); }

.cb-item-info { flex: 1; min-width: 0; }

.cb-item-name {
  font-size: 12px;
  font-weight: 500;
  color: #b0bcd8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-decoration: none;
  transition: color 0.12s;
}

.cb-item-name:hover { color: #3b9eff; }

.cb-item-meta {
  display: flex;
  gap: 6px;
  margin-top: 2px;
  flex-wrap: wrap;
}

.cb-item-tag {
  font-size: 10px;
  color: rgba(200,216,240,0.4);
  background: rgba(214,235,253,0.04);
  padding: 1px 6px;
  border-radius: 20px;
  border: 1px solid rgba(214,235,253,0.06);
}

.cb-item-remove {
  background: transparent;
  border: none;
  color: rgba(200,216,240,0.2);
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
  border-radius: 3px;
  transition: color 0.12s;
  flex-shrink: 0;
  margin-top: 1px;
}

.cb-item-remove:hover { color: #e05252; }

.cb-empty {
  text-align: center;
  padding: 40px 20px;
  color: rgba(200,216,240,0.3);
  font-size: 13px;
}
`

// ─── CollectionBar ────────────────────────────────────────────────────────────

export default function CollectionBar() {
  const {
    selected,
    clearSelection,
    collections,
    addSelectedToCollection,
    createAndAddSelected,
    drawerOpen,
    setDrawerOpen,
    refreshCollections,
  } = useCollection()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const handleAddToCollection = useCallback(
    async (collectionId: string) => {
      setDropdownOpen(false)
      await addSelectedToCollection(collectionId)
    },
    [addSelectedToCollection],
  )

  const handleNewCollection = useCallback(async () => {
    setDropdownOpen(false)
    const name = window.prompt('Collection name:')
    if (!name?.trim()) return
    await createAndAddSelected(name.trim())
  }, [createAndAddSelected])

  if (!mounted || typeof window === 'undefined') return null

  const count = selected.size

  return (
    <>
      <style>{styles}</style>

      <div className="cb-bar" role="toolbar" aria-label="Collection actions">
        <span className="cb-count">
          {count} {count === 1 ? 'problem' : 'problems'} selected
        </span>

        <div className="cb-sep" />

        {/* Add to collection dropdown */}
        <div className="cb-dropdown-wrap" ref={dropdownRef}>
          <button
            type="button"
            className="cb-btn cb-btn-primary"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            Add to Collection {dropdownOpen ? '▴' : '▾'}
          </button>

          {dropdownOpen && (
            <div className="cb-dropdown" role="listbox">
              {collections.length > 0 ? (
                collections.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    className="cb-dropdown-item"
                    role="option"
                    onClick={() => handleAddToCollection(col.id)}
                  >
                    {col.name}
                    <span style={{ color: 'rgba(200,216,240,0.35)', marginLeft: 6, fontSize: 11 }}>
                      {col.items.length}
                    </span>
                  </button>
                ))
              ) : (
                <span className="cb-dropdown-item" style={{ color: 'rgba(200,216,240,0.35)', cursor: 'default' }}>
                  No collections yet
                </span>
              )}
              <button
                type="button"
                className="cb-dropdown-item cb-dropdown-item-new"
                onClick={handleNewCollection}
              >
                + New collection…
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="cb-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="View all collections"
        >
          View Collections
        </button>

        <div className="cb-sep" />

        <button
          type="button"
          className="cb-btn cb-btn-clear"
          onClick={clearSelection}
          aria-label="Clear selection"
        >
          Clear
        </button>
      </div>

      {/* Collections drawer */}
      {drawerOpen && (
        <CollectionDrawer onClose={() => setDrawerOpen(false)} refreshCollections={refreshCollections} />
      )}
    </>
  )
}

// ─── CollectionDrawer ─────────────────────────────────────────────────────────

function CollectionDrawer({
  onClose,
  refreshCollections,
}: {
  onClose: () => void
  refreshCollections: () => void
}) {
  const { collections } = useCollection()
  const { removeFromCollection } = useRemoveFromCollection(refreshCollections)

  const handleDeleteCollection = useCallback(
    async (id: string) => {
      if (!window.confirm('Delete this collection?')) return
      await deleteCollection(id)
      refreshCollections()
    },
    [refreshCollections],
  )

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      <div className="cb-overlay" onClick={onClose} role="presentation" />
      <div
        className="cb-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="My Collections"
      >
        <div className="cb-drawer-header">
          <span className="cb-drawer-title">My Collections</span>
          <button
            type="button"
            className="cb-drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        <div className="cb-drawer-body">
          {collections.length === 0 ? (
            <p className="cb-empty">No collections yet. Select problems and add them to a collection.</p>
          ) : (
            collections.map((col) => (
              <div key={col.id} className="cb-collection-block">
                <div className="cb-collection-head">
                  <span className="cb-collection-name">{col.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="cb-collection-count">{col.items.length} items</span>
                    <button
                      type="button"
                      className="cb-collection-del"
                      onClick={() => handleDeleteCollection(col.id)}
                      aria-label={`Delete collection ${col.name}`}
                      title="Delete collection"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {col.items.length === 0 ? (
                  <p style={{ padding: '10px 14px', fontSize: 12, color: 'rgba(200,216,240,0.3)', margin: 0 }}>
                    Empty collection
                  </p>
                ) : (
                  col.items.map((item) => (
                    <div key={item.id} className="cb-item-row">
                      <div className="cb-item-info">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="cb-item-name"
                          title={item.name}
                        >
                          {item.name}
                        </a>
                        <div className="cb-item-meta">
                          {item.platform && (
                            <span className="cb-item-tag">{item.platform}</span>
                          )}
                          {item.difficulty && (
                            <span className="cb-item-tag">{item.difficulty}</span>
                          )}
                          {item.topic && (
                            <span className="cb-item-tag">{item.topic}</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cb-item-remove"
                        onClick={() => removeFromCollection(col.id, item.id, refreshCollections)}
                        aria-label={`Remove ${item.name} from collection`}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

// ─── Small helper hook to avoid importing removeFromCollection at top-level ───

function useRemoveFromCollection(refreshCollections: () => void) {
  const removeFromCollection = useCallback(
    async (collectionId: string, itemId: string, refresh: () => void) => {
      const { removeFromCollection: remove } = await import('../lib/collections')
      await remove(collectionId, [itemId])
      refresh()
    },
    [],
  )
  return { removeFromCollection }
}
