const FRICTION_REPORTS_KEY = 'frictionReports'

// Recupera reportes guardados y tolera datos corruptos en localStorage.
function loadStoredReports() {
  const data = localStorage.getItem(FRICTION_REPORTS_KEY)

  if (!data) return []

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Guarda en localStorage todos los reportes de friccion actualizados.
function saveStoredReports(reports) {
  localStorage.setItem(FRICTION_REPORTS_KEY, JSON.stringify(reports))
}

// Guarda la valoracion del usuario sobre lo dificil que fue cancelar.
export function saveFrictionReport(reportData) {
  const reports = loadStoredReports()

  const report = {
    id: Date.now(),
    subscriptionId: reportData.subscriptionId,
    subscriptionName: reportData.subscriptionName,
    rating: reportData.rating,
    problems: reportData.problems,
    details: reportData.details,
    createdAt: new Date().toISOString()
  }

  reports.push(report)
  saveStoredReports(reports)

  return report
}
