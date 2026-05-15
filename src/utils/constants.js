export const CATEGORIES = [
  { value: 'streaming', label: 'Streaming' },
  { value: 'musica', label: 'Música' },
  { value: 'juegos', label: 'Juegos' },
  { value: 'software', label: 'Software' },
  { value: 'educacion', label: 'Educación' },
  { value: 'otra', label: 'Otra' }
]

// Garantiza una categoria valida cuando el usuario o datos antiguos no traen valor.
export function normalizeCategoryValue(value) {
  return value || 'otra'
}

// Obtiene la etiqueta visible de una categoria a partir de su valor interno.
export function getCategoryLabel(value) {
  const normalizedValue = normalizeCategoryValue(value)
  const category = CATEGORIES.find(item => item.value === normalizedValue)

  return category?.label || 'Otra'
}
