import { useEffect, useState, useCallback } from 'react'
import { productService, Product } from '../services/productService'
import { useProductCacheStore } from '@shared/store/productCacheStore'
import { logger } from '@shared/logger'

type UseProductsState = {
  products: Product[]
  isLoading: boolean
  error: string | null
  isOffline: boolean
}

const useProducts = () => {
  const { products: cachedProducts, setProducts, isStale } = useProductCacheStore()

  const [state, setState] = useState<UseProductsState>({
    products: cachedProducts,
    isLoading: cachedProducts.length === 0,
    error: null,
    isOffline: false,
  })

  const fetchProducts = useCallback(async () => {
    try {
      const data = await productService.fetchProducts()
      setProducts(data)
      setState({ products: data, isLoading: false, error: null, isOffline: false })
      logger.info('PRODUCTS_FETCHED', { count: data.length })
    } catch (err) {
      logger.error('PRODUCTS_FETCH_FAILED', { error: String(err) })
      if (cachedProducts.length > 0) {
        setState({ products: cachedProducts, isLoading: false, error: null, isOffline: true })
      } else {
        setState({ products: [], isLoading: false, error: 'Não foi possível carregar os produtos.', isOffline: true })
      }
    }
  }, [cachedProducts, setProducts])

  useEffect(() => {
    if (isStale()) {
      fetchProducts()
    } else {
      setState(prev => ({ ...prev, products: cachedProducts, isLoading: false }))
      logger.info('PRODUCTS_FROM_CACHE', { count: cachedProducts.length })
    }
  }, [isStale, fetchProducts, cachedProducts])

  return { ...state, refetch: fetchProducts }
}

export { useProducts }