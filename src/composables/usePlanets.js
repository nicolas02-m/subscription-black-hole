import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { getMonthlyPrice } from '@/utils/formatCurrency'

const CATEGORY_COLORS = {
  entertainment: '#FF6B6B',
  productivity: '#4ECDC4',
  health: '#45B7D1',
  education: '#FFA07A',
  social: '#98D8C8',
  music: '#F7DC6F',
  other: '#BB8FCE'
}

export function usePlanets() {
  const store = useSubscriptionStore()

  const planets = computed(() => {
    const subscriptions = store.subscriptions || []

    if (subscriptions.length === 0) return []

    const subscriptionsWithMonthlyPrice = subscriptions.map((subscription) => ({
      ...subscription,
      monthlyPrice: getMonthlyPrice(subscription)
    }))

    const sorted = [...subscriptionsWithMonthlyPrice].sort((a, b) => b.monthlyPrice - a.monthlyPrice)
    const prices = sorted.map((subscription) => subscription.monthlyPrice)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const minLogPrice = Math.log1p(minPrice)
    const maxLogPrice = Math.log1p(maxPrice)
    const logPriceRange = maxLogPrice - minLogPrice || 1

    return sorted.map((sub, index) => {
      const logPrice = Math.log1p(sub.monthlyPrice)
      const priceNormalized = (logPrice - minLogPrice) / logPriceRange

      // More expensive planets stay closer to the black hole on the X axis.
      const distanceXNormalized = 0.14 + (1 - priceNormalized) * 0.82

      // Alternate sides so planets can appear on both left and right.
      const side = index % 2 === 0 ? 'right' : 'left'

      // Slight Y variation so the planets do not look perfectly linear.
      const yOffsetNormalized = Math.sin(index * 1.15) * 0.32

      // Bigger subscriptions feel like larger planets.
      const radiusNormalized = 0.34 + priceNormalized * 0.34

      const color = CATEGORY_COLORS[sub.category] || CATEGORY_COLORS.other

      return {
        id: sub.id,
        name: sub.name,
        price: sub.price,
        monthlyPrice: sub.monthlyPrice,
        frequency: sub.frequency,
        category: sub.category,
        distanceXNormalized,
        side,
        yOffsetNormalized,
        radiusNormalized,
        color
      }
    })
  })

  return {
    planets
  }
}
