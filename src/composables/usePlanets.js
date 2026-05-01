import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { getMonthlyPrice } from '@/utils/formatCurrency'

const CATEGORY_COLORS = {
  streaming: '#FF6B6B',
  software: '#4ECDC4',
  juegos: '#45B7D1',
  educación: '#FFA07A',
  social: '#98D8C8',
  música: '#F7DC6F',
  otra: '#BB8FCE'
}

const PLANET_SIZE_TIERS = [
  { maxMonthlyPrice: 10, radiusNormalized: 0.18 },
  { maxMonthlyPrice: 20, radiusNormalized: 0.34 },
  { maxMonthlyPrice: 30, radiusNormalized: 0.52 },
  { maxMonthlyPrice: 50, radiusNormalized: 0.72 },
  { maxMonthlyPrice: 80, radiusNormalized: 0.88 },
  { maxMonthlyPrice: Infinity, radiusNormalized: 1 }
]

function getRadiusNormalized(monthlyPrice) {
  return PLANET_SIZE_TIERS.find((tier) => monthlyPrice < tier.maxMonthlyPrice).radiusNormalized
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
      const distanceXNormalized = 0.14 + (1 - priceNormalized) * 0.9

      // Alternate sides so planets can appear on both left and right.
      const side = index % 2 === 0 ? 'right' : 'left'

      // Slight Y variation so the planets do not look perfectly linear.
      const yOffsetNormalized = Math.sin(index * 1.5) * 1

      // Use monthly-price tiers so nearby subscription costs still have visible size jumps.
      const radiusNormalized = getRadiusNormalized(sub.monthlyPrice)

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
