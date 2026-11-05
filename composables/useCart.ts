export function useCart() {
  const items = useState<any[]>('ls_cart', () => [])
  const count = computed(() => items.value.reduce((s, i) => s + Number(i.qty || 1), 0))
  const total = computed(() => items.value.reduce((s, i) => s + Number(i.priceUsd || 0) * Number(i.qty || 1), 0))
  function add(product: any, qty = 1) {
    const found = items.value.find(i => i.slug === product.slug)
    if (found) found.qty += qty
    else items.value.push({ slug: product.slug, name: product.name, priceUsd: product.priceUsd, image: product.image, qty })
    if (import.meta.client) localStorage.setItem('ls_cart', JSON.stringify(items.value))
  }
  function clear() { items.value = []; if (import.meta.client) localStorage.removeItem('ls_cart') }
  function init() { if (import.meta.client) { try { const raw = localStorage.getItem('ls_cart'); if (raw) items.value = JSON.parse(raw) } catch {} } }
  return { items, count, total, add, clear, init }
}
