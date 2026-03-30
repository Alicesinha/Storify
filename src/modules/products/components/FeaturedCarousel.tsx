import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { Product } from '../services/productService'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

type FeaturedCarouselProps = {
  products: Product[]
  onPress: (product: Product) => void
}

export const FeaturedCarousel = ({ products, onPress }: FeaturedCarouselProps) => {
  const featured = products.slice(0, 5)

  if (featured.length === 0) return null

  return (
    <View className="mb-4">
      <Text className="text-base font-bold text-gray-800 mb-3">
        Em destaque
      </Text>
      <Carousel
        width={SCREEN_WIDTH * 0.75}
        height={280}
        data={featured}
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={800}
        style={{ width: SCREEN_WIDTH }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-2xl overflow-hidden elevation-4 flex-1 mx-2"
            onPress={() => onPress(item)}
            activeOpacity={0.9}>
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 180 }}
              resizeMode="contain"
              className="bg-gray-50"
            />
            <View className="p-4">
              <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
                {item.title}
              </Text>
              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-green-600 font-bold text-base">
                  $ {item.price.toFixed(2)}
                </Text>
                <Text className="text-yellow-500 text-xs">
                  ★ {item.rating.rate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}