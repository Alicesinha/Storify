import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { CartItem as CartItemType } from '../store/cartStore'
import { useCartStore } from '../store/cartStore'

type CartItemProps = {
  item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
  const { incrementItem, decrementItem, removeItem } = useCartStore()

  return (
    <View className="flex-row bg-white rounded-lg mb-3 p-3 items-center elevation-1">
      <Image
        source={{ uri: item.product.image }}
        className="w-16 h-16"
        resizeMode="contain"
      />
      <View className="flex-1 ml-3 gap-1">
        <Text className="text-sm text-gray-800 font-medium" numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text className="text-green-600 font-bold">
          $ {(item.product.price * item.quantity).toFixed(2)}
        </Text>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="bg-gray-100 w-7 h-7 rounded-full items-center justify-center"
            onPress={() => decrementItem(item.product.id)}>
            <Text className="text-gray-600 font-bold">-</Text>
          </TouchableOpacity>
          <Text className="text-gray-800 font-medium">{item.quantity}</Text>
          <TouchableOpacity
            className="bg-gray-100 w-7 h-7 rounded-full items-center justify-center"
            onPress={() => incrementItem(item.product.id)}>
            <Text className="text-gray-600 font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="p-2"
        onPress={() => removeItem(item.product.id)}>
        <Text className="text-red-400 text-xs">Remover</Text>
      </TouchableOpacity>
    </View>
  )
}