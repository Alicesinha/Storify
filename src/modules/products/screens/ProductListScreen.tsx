import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProductsStackParamList } from '@navigation/types'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { Product } from '../services/productService'
import { StackNavigationProp } from '@react-navigation/stack'
import { FeaturedCarousel } from '../components/FeaturedCarousel'
import { AnimatedScreen } from '@shared/components/AnimatedScreen'
import { Button } from '@shared/components/Button'

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
          <Button label="Tentar novamente" onPress={refetch} />
      </View>
    )
  }

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id })
  }

  return (
    <AnimatedScreen>
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
          renderItem={({ item }) => <ProductCard product={item} onPress={handleProductPress} />}
          ListHeaderComponent={
            <FeaturedCarousel products={products} onPress={handleProductPress} />
          }
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AnimatedScreen>
  )
}

export { ProductListScreen }
