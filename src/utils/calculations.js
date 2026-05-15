import { getMonthlyPrice } from './formatCurrency'

// Suma el coste mensual equivalente de todas las suscripciones recibidas.
export function calculateMonthlyCost(subscriptions) {
  if (!subscriptions || subscriptions.length === 0) return 0

  return subscriptions.reduce((total, sub) => total + getMonthlyPrice(sub), 0)
}

// Calcula el gasto anual a partir del coste mensual normalizado.
export function calculateAnnualCost(subscriptions) {
  return calculateMonthlyCost(subscriptions) * 12
}

// Devuelve el porcentaje de ahorro respecto al coste total.
export function calculateSavingsPercentage(savings, totalCost) {
  if (totalCost === 0) return 0
  return ((savings / totalCost) * 100).toFixed(1)
}

// Resta el ahorro simulado al coste actual.
export function calculateRemainingCost(currentCost, savings) {
  return currentCost - savings
}
