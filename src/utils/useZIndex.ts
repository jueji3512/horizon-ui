let baseZIndex = 2000

export function useZIndex(): number {
  return typeof window === 'undefined' ? 2000 : ++baseZIndex
}
