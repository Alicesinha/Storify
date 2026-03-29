import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProductsStackParamList } from '@navigation/types'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { Product } from '../services/productService'
import { StackNavigationProp } from '@react-navigation/stack'

type Navigation = StackNavigationProp<ProductsStackParamList, 'ProductList'>

const ProductListScreen = () => {
  const navigation = useNavigation<Navigation>()
  const { products, isLoading, error, isOffline, refetch } = useProducts()

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-4">
        <Text className="text-gray-500 text-base mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={refetch}>
          <Text className="text-white font-medium">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id })
  }

  return (
    <View className="flex-1 bg-gray-50">
      {isOffline && (
        <View className="bg-yellow-400 px-4 py-2">
          <Text className="text-yellow-900 text-xs text-center font-medium">
            Você está offline. Exibindo dados do cache.
          </Text>
        </View>
      )}
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export { ProductListScreen }