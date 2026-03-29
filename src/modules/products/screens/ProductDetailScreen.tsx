import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { ProductsStackParamList } from '@navigation/types'
import { productService, Product } from '../services/productService'
import { logger } from '@shared/logger'
import { useCartStore } from '@modules/cart/store/cartStore'
import { useProductCacheStore } from '@shared/store/productCacheStore'

type Route = RouteProp<ProductsStackParamList, 'ProductDetail'>

export const ProductDetailScreen = () => {
  const route = useRoute<Route>()
  const { productId } = route.params

  const addItem = useCartStore(state => state.addItem)

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { setProductDetail, getProductDetail } = useProductCacheStore()

  const fetchProduct = useCallback(async () => {
    const cached = getProductDetail(productId)
    if (cached) {
      setProduct(cached)
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }

    try {
      const data = await productService.fetchProductById(productId)
      setProductDetail(data)
      setProduct(data)
      logger.info('PRODUCT_DETAIL_FETCHED', { productId })
    } catch (err) {
      logger.error('PRODUCT_DETAIL_FETCH_FAILED', { productId, error: String(err) })
      if (!cached) {
        setError('Não foi possível carregar o produto.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [productId, setProductDetail, getProductDetail])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  if (error || !product) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-gray-500 text-base mb-4">{error}</Text>
        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg" onPress={fetchProduct}>
          <Text className="text-white font-medium">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Image
        source={{ uri: product.image }}
        className="w-full h-72 bg-white"
        resizeMode="contain"
      />
      <View className="p-4 gap-3">
        <Text className="text-lg font-bold text-gray-800">{product.title}</Text>
        <Text className="text-xs text-gray-400 capitalize">{product.category}</Text>
        <Text className="text-2xl font-bold text-green-600">$ {product.price.toFixed(2)}</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-yellow-500 text-sm">★ {product.rating.rate}</Text>
          <Text className="text-gray-400 text-xs">({product.rating.count} avaliações)</Text>
        </View>
        <Text className="text-sm text-gray-600 leading-6">{product.description}</Text>
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-lg mt-2 items-center"
          onPress={() => addItem(product)}>
          <Text className="text-white font-bold text-base">Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
