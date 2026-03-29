import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useBattery } from '@shared/hooks/useBattery'

const getBatteryColor = (level: number): string => {
  if (level <= 20) return '#ef4444'
  if (level <= 50) return '#eab308'
  return '#22c55e'
}

const getBatteryIcon = (level: number): string => {
  if (level <= 10) return 'battery-outline'
  if (level <= 20) return 'battery-10'
  if (level <= 30) return 'battery-20'
  if (level <= 40) return 'battery-30'
  if (level <= 50) return 'battery-40'
  if (level <= 60) return 'battery-60'
  if (level <= 70) return 'battery-70'
  if (level <= 80) return 'battery-80'
  if (level <= 90) return 'battery-90'
  return 'battery'
}

export const BatteryIndicator = () => {
  const level = useBattery()

  if (level === null || level === -1) return null

  return (
    <View className="flex-row items-center gap-1 px-3">
      <Icon name={getBatteryIcon(level)} size={18} color={getBatteryColor(level)} />
      <Text style={{ color: getBatteryColor(level) }} className="text-xs font-medium">
        {level}%
      </Text>
    </View>
  )
}