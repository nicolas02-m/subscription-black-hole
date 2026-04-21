export function calculateMonthlyCost(subscriptions) {
  if (!subscriptions || subscriptions.length === 0) return 0
  
  return subscriptions.reduce((total, sub) => {
    if (sub.frequency === 'yearly') {
      return total + sub.price / 12
    }
    return total + sub.price
  }, 0)
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