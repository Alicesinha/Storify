import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Product } from '../services/productService'

type ProductCardProps = {
  product: Product
  onPress: (product: Product) => void
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => (
  <TouchableOpacity
    className="bg-white rounded-lg mb-4 overflow-hidden elevation-2"
    onPress={() => onPress(product)}
    activeOpacity={0.8}>
    <Image
      source={{ uri: product.image }}
      className="w-full h-44"
      resizeMode="contain"
    />
    <View className="p-3 gap-1">
      <Text className="text-sm text-gray-800 font-medium" numberOfLines={2}>
        {product.title}
      </Text>
      <Text className="text-xs text-gray-400 capitalize">
        {product.category}
      </Text>
      <Text className="text-base text-green-600 font-bold">
        $ {product.price.toFixed(2)}
      </Text>
    </View>
  </TouchableOpacity>
)
