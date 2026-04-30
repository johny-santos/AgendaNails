import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Mônica ✨</Text>
        <Text style={styles.subtitle}>Visão geral do seu negócio</Text>
      </View>

      {/* KPIs */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Ionicons name="cash-outline" size={28} color="#D81B60" />
          <Text style={styles.kpiValue}>R$ 4.850</Text>
          <Text style={styles.kpiLabel}>Faturamento</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons name="people-outline" size={28} color="#D81B60" />
          <Text style={styles.kpiValue}>68</Text>
          <Text style={styles.kpiLabel}>Clientes</Text>
        </View>

        <View style={styles.kpiCard}>
          <MaterialCommunityIcons
            name="package-variant"
            size={28}
            color="#D81B60"
          />
          <Text style={styles.kpiValue}>12</Text>
          <Text style={styles.kpiLabel}>Pacotes Ativos</Text>
        </View>

        <View style={styles.kpiCard}>
          <Ionicons
            name="alert-circle-outline"
            size={28}
            color="#F57C00"
          />
          <Text style={styles.kpiValue}>8%</Text>
          <Text style={styles.kpiLabel}>Faltas</Text>
        </View>
      </View>

      {/* FATURAMENTO VISUAL */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Faturamento do mês</Text>

        <Text style={styles.metricLabel}>Meta mensal</Text>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: '82%' }]} />
        </View>
        <Text style={styles.metricValue}>82% da meta atingida</Text>
      </View>

      {/* SERVIÇOS */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Serviços mais realizados</Text>

        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Alongamento</Text>
          <View style={styles.smallBarBackground}>
            <View style={[styles.smallBarFill, { width: '90%' }]} />
          </View>
        </View>

        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Blindagem</Text>
          <View style={styles.smallBarBackground}>
            <View style={[styles.smallBarFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Pedicure</Text>
          <View style={styles.smallBarBackground}>
            <View style={[styles.smallBarFill, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.serviceRow}>
          <Text style={styles.serviceLabel}>Esmaltação</Text>
          <View style={styles.smallBarBackground}>
            <View style={[styles.smallBarFill, { width: '70%' }]} />
          </View>
        </View>
      </View>

      {/* INSIGHTS */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Insights do mês 📈</Text>

        <Text style={styles.insightText}>
          • Serviço mais vendido: Alongamento
        </Text>

        <Text style={styles.insightText}>
          • Melhor semana: Semana 4
        </Text>

        <Text style={styles.insightText}>
          • Receita com pacotes: R$ 2.300
        </Text>

        <Text style={styles.insightText}>
          • Clientes recorrentes: 72%
        </Text>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={22} color="#fff" />
          <Text style={styles.actionText}>Agenda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people-outline" size={22} color="#fff" />
          <Text style={styles.actionText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons
            name="package-variant"
            size={22}
            color="#fff"
          />
          <Text style={styles.actionText}>Pacotes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 24,
  },

  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#880E4F',
  },

  subtitle: {
    fontSize: 18,
    color: '#AD1457',
    marginTop: 4,
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  kpiCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
  },

  kpiLabel: {
    fontSize: 14,
    color: '#666',
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#880E4F',
    marginBottom: 14,
  },

  metricLabel: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },

  metricValue: {
    marginTop: 8,
    fontWeight: '600',
    color: '#D81B60',
  },

  progressBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#FCE4EC',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#D81B60',
    borderRadius: 10,
  },

  serviceRow: {
    marginBottom: 14,
  },

  serviceLabel: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },

  smallBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#FCE4EC',
    borderRadius: 8,
    overflow: 'hidden',
  },

  smallBarFill: {
    height: '100%',
    backgroundColor: '#EC407A',
    borderRadius: 8,
  },

  insightText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#D81B60',
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 13,
  },
});