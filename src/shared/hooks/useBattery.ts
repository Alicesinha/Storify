import { useEffect, useState } from 'react'
import { getBatteryLevel, startBatteryListener, stopBatteryListener } from '@native/BatteryModule'
import { logger } from '@shared/logger'

const useBattery = (): number | null => {
  const [level, setLevel] = useState<number | null>(null)

  useEffect(() => {
    getBatteryLevel()
      .then(initialLevel => {
        setLevel(initialLevel)
        logger.info('BATTERY_LEVEL', { level: initialLevel })
      })
      .catch(err => {
        logger.error('BATTERY_LEVEL_ERROR', { error: String(err) })
      })

    const subscription = startBatteryListener(newLevel => {
      setLevel(newLevel)
      logger.info('BATTERY_LEVEL_CHANGED', { level: newLevel })
    })

    return () => {
      subscription.remove()
      stopBatteryListener()
    }
  }, [])

  return level
}

export { useBattery }