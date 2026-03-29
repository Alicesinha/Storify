import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabParamList, ProductsStackParamList } from './types'

import { View, Text } from 'react-native'

const ProductListPlaceholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Produtos</Text>
  </View>
)

const ProductDetailPlaceholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Detalhe do Produto</Text>
  </View>
)

const CartPlaceholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Carrinho</Text>
  </View>
)

const CheckoutPlaceholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Checkout</Text>
  </View>
)

const ProductsStack = createStackNavigator<ProductsStackParamList>()

const ProductsNavigator = () => (
  <ProductsStack.Navigator>
    <ProductsStack.Screen name="ProductList" component={ProductListPlaceholder} />
    <ProductsStack.Screen name="ProductDetail" component={ProductDetailPlaceholder} />
  </ProductsStack.Navigator>
)

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProductsTab"
        component={ProductsNavigator}
        options={{ title: 'Produtos', headerShown: false }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartPlaceholder}
        options={{ title: 'Carrinho' }}
      />
      <Tab.Screen
        name="CheckoutTab"
        component={CheckoutPlaceholder}
        options={{ title: 'Checkout' }}
      />
    </Tab.Navigator>
  )
}