export const PLATFORMS = [
  { value: 'creditCard', label: 'Tarjeta de crédito' },
  { value: 'appleStore', label: 'Apple Store' },
  { value: 'playStore', label: 'Play Store' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'web', label: 'Web' },
  { value: 'other', label: 'Otros' }
]

export const CANCELLATION_GUIDES = {
  creditCard: {
    title: 'Guía de cancelación para Tarjeta de Crédito',
    steps: [
      'Accede al sitio web del servicio o a la aplicación.',
      'Inicia sesión en tu cuenta.',
      'Ve a la sección de "Cuenta" o "Suscripciones".',
      'Selecciona la suscripción a cancelar.',
      'Elige la opción "Cancelar suscripción" o "Gestionar pagos".',
      'Confirma la cancelación. Nota: Puedes seguir usando el servicio hasta el final del período de facturación.'
    ]
  },
  appleStore: {
    title: 'Guía de cancelación para Apple Store',
    steps: [
      'Abre la aplicación "Configuración" en tu dispositivo iOS.',
      'Toca tu nombre/ID de Apple en la parte superior.',
      'Selecciona "Suscripciones".',
      'Elige la suscripción que deseas cancelar.',
      'Toca "Cancelar suscripción" y confirma.',
      'La cancelación se procesará al final del período de facturación actual.'
    ]
  },
  playStore: {
    title: 'Guía de cancelación para Play Store',
    steps: [
      'Abre la aplicación Google Play Store.',
      'Toca el menú y selecciona "Suscripciones".',
      'Encuentra la suscripción a cancelar.',
      'Toca "Cancelar suscripción".',
      'Sigue las instrucciones para confirmar.',
      'Podrás usar el servicio hasta el final del período pagado.'
    ]
  },
  paypal: {
    title: 'Guía de cancelación para PayPal',
    steps: [
      'Inicia sesión en tu cuenta de PayPal.',
      'Ve a "Configuración" > "Pagos" > "Administrar suscripciones preaprobadas".',
      'Encuentra la suscripción y selecciona "Cancelar".',
      'Confirma la cancelación.',
      'Contacta al proveedor del servicio si es necesario para cancelaciones adicionales.'
    ]
  },
  web: {
    title: 'Guía de cancelación para Sitio Web',
    steps: [
      'Visita el sitio web del servicio.',
      'Inicia sesión en tu cuenta.',
      'Busca la sección "Mi cuenta", "Perfil" o "Suscripciones".',
      'Selecciona "Cancelar suscripción" o "Gestionar cuenta".',
      'Sigue los pasos para confirmar la cancelación.',
      'Revisa tu email para confirmación.'
    ]
  },
  other: {
    title: 'Guía de cancelación para Otros',
    steps: [
      'Revisa el email de confirmación de la suscripción para enlaces de cancelación.',
      'Contacta al soporte del servicio directamente.',
      'Proporciona detalles de tu cuenta para asistencia.',
      'Confirma la cancelación por escrito si es posible.',
      'Monitorea tu cuenta bancaria para asegurar que no se realicen más cargos.'
    ]
  }
}
