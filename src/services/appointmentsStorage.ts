import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@agendanails:appointments';

export type AppointmentStatus = 'AGENDADO' | 'COMPARECEU' | 'FALTOU' | 'DESMARCOU';

export interface Appointment {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  service: string;
  date: string;
  description: string;
  status: AppointmentStatus;
}

async function getAppointments(): Promise<Appointment[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export async function listAppointmentsByDate(date: string): Promise<Appointment[]> {
  const appointments = await getAppointments();
  return appointments
    .filter((appointment) => appointment.date === date)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export async function addAppointment(
  appointment: Omit<Appointment, 'id' | 'status'>
): Promise<Appointment> {
  const appointments = await getAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: `${Date.now()}`,
    status: 'AGENDADO',
  };

  await saveAppointments([...appointments, newAppointment]);
  return newAppointment;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const appointments = await getAppointments();
  const updated = appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, status } : appointment
  );

  await saveAppointments(updated);
}

export async function deleteAppointment(id: string): Promise<void> {
  const appointments = await getAppointments();
  await saveAppointments(appointments.filter((appointment) => appointment.id !== id));
}
