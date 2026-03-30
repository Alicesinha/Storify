import { useCartStore } from '../cartStore'
import { Product } from '@modules/products/services/productService'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'test',
  image: 'https://test.com/image.png',
  rating: { rate: 4.5, count: 100 },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 49.99,
  description: 'Test description 2',
  category: 'test',
  image: 'https://test.com/image2.png',
  rating: { rate: 3.5, count: 50 },
}

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], total: 0, totalItems: 0 })
  })

  it('deve adicionar um produto ao carrinho', () => {
    useCartStore.getState().addItem(mockProduct)
    const { items, total, totalItems } = useCartStore.getState()

    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(1)
    expect(total).toBeCloseTo(99.99)
    expect(totalItems).toBe(1)
  })

  it('deve incrementar a quantidade ao adicionar produto existente', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    const { items, totalItems } = useCartStore.getState()

    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
    expect(totalItems).toBe(2)
  })

  it('deve remover um produto do carrinho', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().removeItem(mockProduct.id)
    const { items, total, totalItems } = useCartStore.getState()

    expect(items).toHaveLength(0)
    expect(total).toBe(0)
    expect(totalItems).toBe(0)
  })

  it('deve incrementar a quantidade do produto', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().incrementItem(mockProduct.id)
    const { items } = useCartStore.getState()

    expect(items[0].quantity).toBe(2)
  })

  it('deve decrementar a quantidade do produto', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().decrementItem(mockProduct.id)
    const { items } = useCartStore.getState()

    expect(items[0].quantity).toBe(1)
  })

  it('deve remover o produto ao decrementar para zero', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().decrementItem(mockProduct.id)
    const { items } = useCartStore.getState()

    expect(items).toHaveLength(0)
  })

  it('deve limpar o carrinho', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct2)
    useCartStore.getState().clear()
    const { items, total, totalItems } = useCartStore.getState()

    expect(items).toHaveLength(0)
    expect(total).toBe(0)
    expect(totalItems).toBe(0)
  })

  it('deve calcular o total corretamente com múltiplos produtos', () => {
    useCartStore.getState().addItem(mockProduct)
    useCartStore.getState().addItem(mockProduct2)
    const { total, totalItems } = useCartStore.getState()

    expect(total).toBeCloseTo(149.98)
    expect(totalItems).toBe(2)
  })
})