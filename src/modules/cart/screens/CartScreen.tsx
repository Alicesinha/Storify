import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabParamList } from '@navigation/types'
import { useCartStore } from '../store/cartStore'
import { CartItem } from '../components/CartItem'
import { AnimatedScreen } from '@shared/components/AnimatedScreen'
import { Button } from '@shared/components/Button'

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
    <AnimatedScreen>
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
            <Text className="text-gray-800 font-bold text-lg">$ {total.toFixed(2)}</Text>
          </View>
          <View className="flex-row gap-3 mt-2">
            <View style={{ flex: 1 }}>
              <Button label="Limpar" variant="outline" onPress={clear} fullWidth={false} />
            </View>
            <View style={{ flex: 2 }}>
              <Button
                label="Ir para Checkout"
                onPress={() => navigation.navigate('CheckoutTab')}
                fullWidth={false}
              />
            </View>
          </View>
        </View>
      </View>
    </AnimatedScreen>
  )
}
