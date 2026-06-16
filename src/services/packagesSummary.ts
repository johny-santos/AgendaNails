export interface PackageSummary {
  id: string;
  clientName: string;
  service: string;
  totalSessions: number;
  completedSessions: number;
}

export const packageSummaries: PackageSummary[] = [
  {
    id: 'sabrina-sato-manicure-premium',
    clientName: 'Sabrina Sato',
    service: 'Manicure Premium',
    totalSessions: 4,
    completedSessions: 2,
  },
];

export function getPackageAppointmentsCount() {
  return packageSummaries.reduce(
    (total, packageItem) => total + packageItem.totalSessions,
    0
  );
}
