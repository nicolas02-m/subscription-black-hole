export function getMonthlyPrice(subscription) {
  if (!subscription) return 0

  const price = Number(subscription.price) || 0

  if (subscription.frequency === 'yearly') {
    return price / 12
  }

  return price
}

export function formatCurrency(amount, locale = 'es-ES', currency = 'EUR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(amount) || 0)
}

export function formatSubscriptionMonthlyPrice(subscription) {
  return `${formatCurrency(getMonthlyPrice(subscription))}/mes`
}
