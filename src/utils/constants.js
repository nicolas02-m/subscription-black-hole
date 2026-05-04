export const CATEGORIES = [
  { value: 'streaming', label: 'Streaming' },
  { value: 'musica', label: 'Música' },
  { value: 'juegos', label: 'Juegos' },
  { value: 'software', label: 'Software' },
  { value: 'educacion', label: 'Educación' },
  { value: 'otra', label: 'Otra' }
]

const LEGACY_CATEGORY_VALUES = {
  'música': 'musica',
  'm\u00c3\u00basica': 'musica',
  'educación': 'educacion',
  'educaci\u00c3\u00b3n': 'educacion'
}

export function normalizeCategoryValue(value) {
  return LEGACY_CATEGORY_VALUES[value] || value || 'otra'
}

export function getCategoryLabel(value) {
  const normalizedValue = normalizeCategoryValue(value)
  const category = CATEGORIES.find(item => item.value === normalizedValue)

  return category?.label || 'Otra'
}
