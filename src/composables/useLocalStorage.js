const STORAGE_KEY = 'subscriptions'

export function useLocalStorage() {
  // Guarda todas las suscripciones como JSON en el almacenamiento del navegador.
  const saveSubscriptions = (subscriptions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions))
  }

  // Lee suscripciones guardadas y devuelve null si faltan o estan corruptas.
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
