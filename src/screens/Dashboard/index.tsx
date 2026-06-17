import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import apiService from '../../services/apiService';
import {
  Appointment,
  listAppointments,
} from '../../services/appointmentsStorage';
import { getPackageAppointmentsCount } from '../../services/packagesSummary';

type PeriodFilter = 'today' | 'week' | 'month';

interface ServiceChartItem {
  name: string;
  amount: number;
  color: string;
}

const serviceColors = ['#D81B60', '#00897B', '#5E35B1', '#F57C00'];

const periodOptions: Array<{ label: string; value: PeriodFilter }> = [
  { label: 'Hoje', value: 'today' },
  { label: 'Semana', value: 'week' },
  { label: 'Mês', value: 'month' },
];

function parseBrazilianDate(date: string): Date | null {
  const [day, month, year] = date.split('/').map(Number);

  if (!day || !month || !year) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function isSameDay(first: Date, second: Date) {
  return first.toDateString() === second.toDateString();
}

function isSameWeek(date: Date, reference: Date) {
  const weekStart = new Date(reference);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(reference.getDate() - reference.getDay());

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return date >= weekStart && date <= weekEnd;
}

function isSameMonth(first: Date, second: Date) {
  return (
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear()
  );
}

function matchesPeriod(appointment: Appointment, period: PeriodFilter) {
  const appointmentDate = parseBrazilianDate(appointment.date);
  const today = new Date();

  if (!appointmentDate) {
    return false;
  }

  if (period === 'today') {
    return isSameDay(appointmentDate, today);
  }

  if (period === 'week') {
    return isSameWeek(appointmentDate, today);
  }

  return isSameMonth(appointmentDate, today);
}

function buildServiceChart(appointments: Appointment[]): ServiceChartItem[] {
  const serviceCount = appointments.reduce<Record<string, number>>((acc, appointment) => {
    const service = appointment.service || 'Sem serviço';
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(serviceCount)
    .sort(([, firstAmount], [, secondAmount]) => secondAmount - firstAmount)
    .slice(0, 4)
    .map(([name, amount], index) => ({
      name,
      amount,
      color: serviceColors[index] || '#AD1457',
    }));
}

export default function Dashboard() {
  const [nomeUsuario, setNomeUsuario] = useState('Profissional');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('month');

  useEffect(() => {
    const carregarUsuario = async () => {
      const profissional = await apiService.obterUsuarioArmazenado();
      if (profissional?.nome) {
        setNomeUsuario(profissional.nome);
      }
    };

    carregarUsuario();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const carregarAtendimentos = async () => {
        const data = await listAppointments();
        setAppointments(data);
      };

      carregarAtendimentos();
    }, [])
  );

  const filteredAppointments = useMemo(
    () => appointments.filter((appointment) => matchesPeriod(appointment, selectedPeriod)),
    [appointments, selectedPeriod]
  );

  const completedAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === 'COMPARECEU'
  );
  const missedAppointments = filteredAppointments.filter(
    (appointment) => appointment.status === 'FALTOU'
  );
  const uniqueClients = new Set(filteredAppointments.map((appointment) => appointment.name)).size;
  const packageAppointmentsCount = getPackageAppointmentsCount();
  const absenceRate = filteredAppointments.length
    ? Math.round((missedAppointments.length / filteredAppointments.length) * 100)
    : 0;
  const topServices = buildServiceChart(filteredAppointments);
  const topService = topServices[0];
  const chartTotal = topServices.reduce((total, service) => total + service.amount, 0);
  const bestServicePercent = topService && filteredAppointments.length
    ? Math.round((topService.amount / filteredAppointments.length) * 100)
    : 0;

  const insights = [
    topService
      ? `${topService.name} representa ${bestServicePercent}% dos atendimentos do período.`
      : 'Cadastre atendimentos para visualizar o serviço mais procurado.',
    filteredAppointments.length
      ? `${completedAppointments.length} de ${filteredAppointments.length} atendimentos foram marcados como compareceu.`
      : 'Ainda não há atendimentos no período selecionado.',
    absenceRate > 0
      ? `A taxa de faltas está em ${absenceRate}%.`
      : 'Nenhuma falta registrada no período.',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {nomeUsuario}</Text>
        <Text style={styles.subtitle}>Visão geral do seu negócio</Text>
      </View>

      <View style={styles.periodSelector}>
        {periodOptions.map((option) => {
          const isSelected = selectedPeriod === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.periodButton,
                isSelected && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(option.value)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  isSelected && styles.periodButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.kpiGrid}>
        <KpiCard
          icon={<Ionicons name="calendar-outline" size={26} color="#D81B60" />}
          value={`${filteredAppointments.length}`}
          label="Atendimento avulso"
          helper="cadastrado na Home"
        />

        <KpiCard
          icon={<MaterialCommunityIcons name="package-variant" size={26} color="#5E35B1" />}
          value={`${packageAppointmentsCount}`}
          label="Atendimentos pacote"
          helper="sessões em pacotes"
        />

        <KpiCard
          icon={<Ionicons name="people-outline" size={26} color="#00897B" />}
          value={`${uniqueClients}`}
          label="Clientes"
          helper="nomes únicos"
        />

        <KpiCard
          icon={<Ionicons name="alert-circle-outline" size={26} color="#F57C00" />}
          value={`${absenceRate}%`}
          label="Faltas"
          helper={`${missedAppointments.length} registro(s)`}
        />
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Serviços mais realizados</Text>
          <Text style={styles.sectionBadge}>
            {periodOptions.find((option) => option.value === selectedPeriod)?.label}
          </Text>
        </View>

        {topServices.length === 0 ? (
          <View style={styles.emptyChart}>
            <MaterialCommunityIcons name="chart-bar" size={30} color="#D81B60" />
            <Text style={styles.emptyChartText}>Sem dados para montar o gráfico.</Text>
          </View>
        ) : (
          <>
            <VerticalServicesChart data={topServices} />

            <View style={styles.chartFooter}>
              <View style={styles.chartLegendItem}>
                <View style={styles.chartLegendDot} />
                <Text style={styles.chartLegendText}>Volume de atendimentos</Text>
              </View>
              <Text style={styles.chartTotal}>{chartTotal} no total</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Insights do período</Text>

        {insights.map((insight) => (
          <View key={insight} style={styles.insightRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#00897B" />
            <Text style={styles.insightText}>{insight}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

interface KpiCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  helper: string;
}

function KpiCard({ icon, value, label, helper }: KpiCardProps) {
  return (
    <View style={styles.kpiCard}>
      {icon}
      <Text style={styles.kpiValue} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiHelper}>{helper}</Text>
    </View>
  );
}

function VerticalServicesChart({ data }: { data: ServiceChartItem[] }) {
  const maxAmount = Math.max(...data.map((service) => service.amount));

  return (
    <View style={styles.chartArea}>
      {data.map((service) => {
        const barHeight = Math.max(Math.round((service.amount / maxAmount) * 100), 12);
        const barHeightPercent = `${barHeight}%` as `${number}%`;

        return (
          <View key={service.name} style={styles.chartColumn}>
            <Text style={styles.serviceAmount}>{service.amount}</Text>

            <View style={styles.chartBarTrack}>
              <View
                style={[
                  styles.chartBarFill,
                  {
                    height: barHeightPercent,
                    backgroundColor: service.color,
                  },
                ]}
              />
            </View>

            <Text style={styles.serviceLabel} numberOfLines={2}>
              {service.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8BBD9',
    padding: 20,
  },

  header: {
    marginTop: 30,
    marginBottom: 18,
  },

  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#880E4F',
  },

  subtitle: {
    fontSize: 17,
    color: '#AD1457',
    marginTop: 4,
  },

  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 5,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  periodButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  periodButtonActive: {
    backgroundColor: '#D81B60',
  },

  periodButtonText: {
    color: '#AD1457',
    fontWeight: '700',
    fontSize: 13,
  },

  periodButtonTextActive: {
    color: '#FFFFFF',
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  kpiCard: {
    width: '47%',
    minHeight: 140,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  kpiValue: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
    textAlign: 'center',
  },

  kpiLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontWeight: '700',
    textAlign: 'center',
  },

  kpiHelper: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
  },

  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#880E4F',
    flexShrink: 1,
  },

  sectionBadge: {
    backgroundColor: '#FCE4EC',
    color: '#AD1457',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 180,
    gap: 12,
  },

  chartColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  serviceLabel: {
    fontSize: 11,
    color: '#333',
    fontWeight: '700',
    marginTop: 8,
    minHeight: 30,
    textAlign: 'center',
  },

  serviceAmount: {
    fontSize: 13,
    color: '#880E4F',
    fontWeight: '800',
    marginBottom: 8,
  },

  chartBarTrack: {
    width: '100%',
    maxWidth: 48,
    height: 130,
    backgroundColor: '#FCE4EC',
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  chartBarFill: {
    width: '100%',
    borderRadius: 14,
  },

  chartFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F8BBD9',
    marginTop: 16,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  chartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },

  chartLegendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#D81B60',
  },

  chartLegendText: {
    fontSize: 12,
    color: '#666',
  },

  chartTotal: {
    fontSize: 12,
    color: '#880E4F',
    fontWeight: '700',
  },

  emptyChart: {
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7FB',
    borderRadius: 16,
  },

  emptyChartText: {
    color: '#777',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },

  insightText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  },

});
