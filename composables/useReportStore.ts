import type { Report } from '~/models/Report';

export const useReportStore = () => {
  const reports = useState<Report[]>('reports', () => [])

  const updateReports = (newReports: Report[]) => {
    newReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    reports.value = newReports
  }

  const addReport = (newReport: Report) => {
    const newReports = [...reports.value, newReport]
    newReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    reports.value = newReports
  }

  const updateReport = (updatedReport: Report) => {
    const filteredReports = reports.value.filter(report => report.id !== updatedReport.id)
    const newReports = [...filteredReports, updatedReport]
    newReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    reports.value = newReports
  }

  return {
    reports,
    updateReports,
    updateReport,
    addReport,
  }
}