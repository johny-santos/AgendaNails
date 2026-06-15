import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@agendanails:appointments';

// Este arquivo concentra o armazenamento local dos atendimentos.
// Como o backend desta versão só possui autenticação, usamos AsyncStorage
// para permitir que a agenda funcione no celular durante a apresentação.

export type AppointmentStatus = 'AGENDADO' | 'COMPARECEU' | 'FALTOU' | 'DESMARCOU';

export interface Appointment {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  service: string;
  serviceValue?: number;
  date: string;
  description: string;
  status: AppointmentStatus;
}

function normalizeDate(date: string): string {
  const [day, month, year] = date.trim().split('/').map(Number);

  if (!day || !month || !year) {
    return date.trim();
  }

  return [
    String(day).padStart(2, '0'),
    String(month).padStart(2, '0'),
    String(year),
  ].join('/');
}

async function getAppointments(): Promise<Appointment[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function listAppointments(): Promise<Appointment[]> {
  const appointments = await getAppointments();
  return appointments.sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);
    return dateComparison === 0
      ? a.startTime.localeCompare(b.startTime)
      : dateComparison;
  });
}

async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export async function listAppointmentsByDate(date: string): Promise<Appointment[]> {
  const appointments = await getAppointments();
  const normalizedSelectedDate = normalizeDate(date);

  // A Home chama esta função sempre que a data selecionada muda.
  // Por isso filtramos pela data e ordenamos pelo horário inicial.
  return appointments
    .filter((appointment) => normalizeDate(appointment.date) === normalizedSelectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export async function addAppointment(
  appointment: Omit<Appointment, 'id' | 'status'>
): Promise<Appointment> {
  const appointments = await getAppointments();

  // O ID é gerado pelo horário atual para diferenciar cada atendimento.
  // Todo novo atendimento começa com status AGENDADO.
  const newAppointment: Appointment = {
    ...appointment,
    date: normalizeDate(appointment.date),
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

  // Atualiza apenas o atendimento selecionado na tela de detalhes.
  const updated = appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, status } : appointment
  );

  await saveAppointments(updated);
}

export async function deleteAppointment(id: string): Promise<void> {
  const appointments = await getAppointments();

  // Remove o atendimento do armazenamento local.
  await saveAppointments(appointments.filter((appointment) => appointment.id !== id));
}
