import { useProductCacheStore } from '../productCacheStore'
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

const mockProducts: Product[] = [mockProduct]

describe('productCacheStore', () => {
  beforeEach(() => {
    useProductCacheStore.setState({
      products: [],
      productDetails: {},
      lastFetched: null,
    })
  })

  it('deve salvar produtos no cache', () => {
    useProductCacheStore.getState().setProducts(mockProducts)
    const { products, lastFetched } = useProductCacheStore.getState()

    expect(products).toHaveLength(1)
    expect(lastFetched).not.toBeNull()
  })

  it('deve retornar isStale true quando nao ha cache', () => {
    const { isStale } = useProductCacheStore.getState()
    expect(isStale()).toBe(true)
  })

  it('deve retornar isStale false quando cache eh recente', () => {
    useProductCacheStore.getState().setProducts(mockProducts)
    const { isStale } = useProductCacheStore.getState()
    expect(isStale()).toBe(false)
  })

  it('deve retornar isStale true quando cache esta expirado', () => {
    useProductCacheStore.setState({
      products: mockProducts,
      lastFetched: Date.now() - 6 * 60 * 1000, // 6 minutos atrás
      productDetails: {},
    })
    const { isStale } = useProductCacheStore.getState()
    expect(isStale()).toBe(true)
  })

  it('deve salvar e recuperar detalhe de produto', () => {
    useProductCacheStore.getState().setProductDetail(mockProduct)
    const detail = useProductCacheStore.getState().getProductDetail(mockProduct.id)

    expect(detail).toEqual(mockProduct)
  })

  it('deve retornar undefined para produto nao cacheado', () => {
    const detail = useProductCacheStore.getState().getProductDetail(999)
    expect(detail).toBeUndefined()
  })
})