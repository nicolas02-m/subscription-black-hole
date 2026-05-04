import { getMonthlyPrice } from './formatCurrency'

export function calculateMonthlyCost(subscriptions) {
  if (!subscriptions || subscriptions.length === 0) return 0

  return subscriptions.reduce((total, sub) => total + getMonthlyPrice(sub), 0)
}

export function calculateAnnualCost(subscriptions) {
  return calculateMonthlyCost(subscriptions) * 12
}

export function calculateSavingsPercentage(savings, totalCost) {
  if (totalCost === 0) return 0
  return ((savings / totalCost) * 100).toFixed(1)
}

export function calculateRemainingCost(currentCost, savings) {
  return currentCost - savings
}
