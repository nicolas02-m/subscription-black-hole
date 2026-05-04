const STORAGE_KEY = 'subscriptions'

export function useLocalStorage() {
  const saveSubscriptions = (subscriptions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions))
  }

  const loadSubscriptions = () => {
    const data = localStorage.getItem(STORAGE_KEY)

    if (!data) return null

    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  }

  return {
    saveSubscriptions,
    loadSubscriptions
  }
}
