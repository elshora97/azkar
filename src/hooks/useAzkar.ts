import { useEffect, useState } from 'react'
import { loadCategory, snapshotCategory, type CategoryId, type Source, type Zikr } from '../data/api'

/** Renders the bundled snapshot immediately, then swaps in live API data when it arrives. */
export function useAzkar(category: CategoryId) {
  const [state, setState] = useState<{ category: CategoryId; items: Zikr[]; source: Source | 'loading' }>(() => ({
    category,
    items: snapshotCategory(category),
    source: 'loading',
  }))

  if (state.category !== category) {
    setState({ category, items: snapshotCategory(category), source: 'loading' })
  }

  useEffect(() => {
    const ctrl = new AbortController()
    loadCategory(category, ctrl.signal)
      .then(({ items, source }) => setState({ category, items, source }))
      .catch(() => {
        if (!ctrl.signal.aborted) setState((s) => ({ ...s, source: 'offline' }))
      })
    return () => ctrl.abort()
  }, [category])

  return state
}
