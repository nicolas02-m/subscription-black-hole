import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { getMonthlyPrice } from '@/utils/formatCurrency'
import { normalizeCategoryValue } from '@/utils/constants'

const CATEGORY_COLORS = {
  streaming: '#FF6B6B',
  software: '#4ECDC4',
  juegos: '#45B7D1',
  educacion: '#FFA07A',
  social: '#98D8C8',
  musica: '#F7DC6F',
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
  return PLANET_SIZE_TIERS.find(tier => monthlyPrice < tier.maxMonthlyPrice).radiusNormalized
}

export function usePlanets() {
  const store = useSubscriptionStore()

  const planets = computed(() => {
    const subscriptions = store.subscriptions || []

    if (subscriptions.length === 0) return []

    const subscriptionsWithMonthlyPrice = subscriptions.map(subscription => ({
      ...subscription,
      monthlyPrice: getMonthlyPrice(subscription)
    }))

    const sorted = [...subscriptionsWithMonthlyPrice].sort((a, b) => b.monthlyPrice - a.monthlyPrice)
    const prices = sorted.map(subscription => subscription.monthlyPrice)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const minLogPrice = Math.log1p(minPrice)
    const maxLogPrice = Math.log1p(maxPrice)
    const logPriceRange = maxLogPrice - minLogPrice || 1

    return sorted.map((subscription, index) => {
      const logPrice = Math.log1p(subscription.monthlyPrice)
      const priceNormalized = (logPrice - minLogPrice) / logPriceRange
      const category = normalizeCategoryValue(subscription.category)

      return {
        id: subscription.id,
        name: subscription.name,
        price: subscription.price,
        monthlyPrice: subscription.monthlyPrice,
        frequency: subscription.frequency,
        category,
        distanceXNormalized: 0.14 + (1 - priceNormalized) * 0.9,
        side: index % 2 === 0 ? 'right' : 'left',
        yOffsetNormalized: Math.sin(index * 1.5),
        radiusNormalized: getRadiusNormalized(subscription.monthlyPrice),
        color: CATEGORY_COLORS[category] || CATEGORY_COLORS.otra
      }
    })
  })

  return {
    planets
  }
}
