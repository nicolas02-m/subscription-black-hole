// Devuelve el precio mensual equivalente de una suscripcion.
export function getMonthlyPrice(subscription) {
  if (!subscription) return 0

  const price = Number(subscription.price) || 0

  // Las suscripciones anuales se reparten entre 12 meses para comparar costes.
  if (subscription.frequency === 'yearly') {
    return price / 12
  }

  return price
}

// Formatea un importe con locale y divisa configurables.
export function formatCurrency(amount, locale = 'es-ES', currency = 'EUR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(amount) || 0)
}

// Muestra el precio mensual de una suscripcion listo para la interfaz.
export function formatSubscriptionMonthlyPrice(subscription) {
  return `${formatCurrency(getMonthlyPrice(subscription))}/mes`
}
