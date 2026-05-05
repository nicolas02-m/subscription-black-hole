export const CATEGORIES = [
  { value: 'streaming', label: 'Streaming' },
  { value: 'musica', label: 'Música' },
  { value: 'juegos', label: 'Juegos' },
  { value: 'software', label: 'Software' },
  { value: 'educacion', label: 'Educación' },
  { value: 'otra', label: 'Otra' }
]

export function normalizeCategoryValue(value) {
  return value || 'otra'
}

export function getCategoryLabel(value) {
  const normalizedValue = normalizeCategoryValue(value)
  const category = CATEGORIES.find(item => item.value === normalizedValue)

  return category?.label || 'Otra'
}
