import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabParamList } from '@navigation/types'
import { useCartStore } from '../store/cartStore'
import { CartItem } from '../components/CartItem'

type Navigation = StackNavigationProp<BottomTabParamList>

export const CartScreen = () => {
  const navigation = useNavigation<Navigation>()
  const { items, total, totalItems, clear } = useCartStore()

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-4">
        <Text className="text-gray-400 text-base">Seu carrinho está vazio.</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={items}
        keyExtractor={item => String(item.product.id)}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <View className="bg-white p-4 elevation-4">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-500 text-sm">{totalItems} itens</Text>
          <Text className="text-gray-800 font-bold text-lg">
            $ {total.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row gap-3 mt-2">
          <TouchableOpacity
            className="flex-1 border border-gray-300 py-3 rounded-lg items-center"
            onPress={clear}>
            <Text className="text-gray-500 font-medium">Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-2 bg-blue-500 py-3 px-6 rounded-lg items-center"
            onPress={() => navigation.navigate('CheckoutTab')}>
            <Text className="text-white font-bold">Ir para Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}