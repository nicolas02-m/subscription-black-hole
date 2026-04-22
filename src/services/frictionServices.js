const FRICTION_REPORTS_KEY = 'frictionReports'

function loadStoredReports() {
  const data = localStorage.getItem(FRICTION_REPORTS_KEY)

  if (!data) {
    return []
  }

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveStoredReports(reports) {
  localStorage.setItem(FRICTION_REPORTS_KEY, JSON.stringify(reports))
}

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

export function getFrictionReports() {
  return loadStoredReports()
}
