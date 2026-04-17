const STORAGE_KEY = 'subscriptions';

export function useLocalStorage() {
  const saveSubscriptions = (subscriptions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  };

  const loadSubscriptions = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  return {
    saveSubscriptions,
    loadSubscriptions
  };
}
