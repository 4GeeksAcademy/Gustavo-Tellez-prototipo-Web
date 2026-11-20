const money = (value, currency = 'USD') => new Intl.NumberFormat('es', {
  style: 'currency',
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(Number.isFinite(Number(value)) ? Number(value) : 0);

const dateFormatter = new Intl.DateTimeFormat('es', { day: '2-digit', month: 'short', year: 'numeric' });
const dateTimeFormatter = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' });

function formatDate(value) {
  if (!value) return 'Sin fecha de finalización';
  const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime()) ? 'No disponible' : dateFormatter.format(date);
}

function formatDateTime(value) {
  if (!value) return 'No disponible';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'No disponible' : dateTimeFormatter.format(date);
}

function getLocalDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getUserById(userId) {
  return appState.users.find(user => user.id === userId) || null;
}

function getAgentById(agentId) {
  return appState.agents.find(agent => agent.id === agentId) || null;
}

function getSkillById(skillId) {
  return appState.skills.find(skill => skill.id === skillId) || null;
}

function getContractById(contractId) {
  return appState.contracts.find(contract => contract.id === contractId) || null;
}

function getErrorLogById(errorId) {
  return appState.errorLogs.find(log => log.id === errorId) || null;
}

function getAgentStatus(agentId) {
  const agent = getAgentById(agentId);
  if (!agent || agent.deletedAt || !agent.enabled) return 'inactive';
  const hasBlockingError = appState.errorLogs.some(log =>
    log.agentId === agentId &&
    log.status === 'unresolved' &&
    ['critical', 'error'].includes(log.severity)
  );
  return hasBlockingError ? 'failing' : 'active';
}

function getAgentStatusLabel(status) {
  return ({ active: 'Activo', inactive: 'Inactivo', failing: 'Fallando' })[status] || 'Desconocido';
}

function getSeverityLabel(severity) {
  return ({ critical: 'Crítico', error: 'Error', warning: 'Advertencia', info: 'Información' })[severity] || 'Desconocida';
}

function getLast7Days() {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      key: getLocalDateKey(date),
      date,
      label: new Intl.DateTimeFormat('es', { weekday: 'short' }).format(date).replace('.', ''),
      fullLabel: new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long' }).format(date)
    };
  });
}

function isCurrentMonth(value, reference = new Date()) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
}

function getPaidPayments() {
  return appState.contracts.flatMap(contract => (contract.payments || [])
    .filter(payment => payment.status === 'paid')
    .map(payment => ({ ...payment, contractId: contract.id })));
}

function getDashboardSummary() {
  const paidPayments = getPaidPayments();
  const currentMonthPayments = paidPayments.filter(payment => isCurrentMonth(payment.paidAt));
  const activeAgents = appState.agents.filter(agent => !agent.deletedAt && getAgentStatus(agent.id) === 'active').length;
  const failingAgents = appState.agents.filter(agent => !agent.deletedAt && getAgentStatus(agent.id) === 'failing').length;
  const days = getLast7Days();
  const weeklyActivity = days.map(day => {
    const payments = paidPayments.filter(payment => getLocalDateKey(payment.paidAt) === day.key);
    return {
      ...day,
      amount: payments.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0),
      discountAmount: payments.reduce((sum, payment) => sum + Number(payment.discountAmount || 0), 0),
      paymentCount: payments.length
    };
  });
  return {
    monthRevenue: currentMonthPayments.reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0),
    monthDiscounts: currentMonthPayments.reduce((sum, payment) => sum + Number(payment.discountAmount || 0), 0),
    activeAgents,
    failingAgents,
    weeklyActivity,
    weeklyRevenue: weeklyActivity.reduce((sum, day) => sum + day.amount, 0),
    weeklyPaymentCount: weeklyActivity.reduce((sum, day) => sum + day.paymentCount, 0)
  };
}

function getSkillUsageCount(skillId) {
  return appState.agents.filter(agent => !agent.deletedAt && agent.skillIds.includes(skillId)).length;
}

function getContractDuration(contract) {
  if (!contract?.startDate || !contract?.endDate) return null;
  const start = new Date(`${contract.startDate}T12:00:00`);
  const end = new Date(`${contract.endDate}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return null;
  return Math.round((end - start) / 86400000) + 1;
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function getContractBreakdown(contractId) {
  const contract = getContractById(contractId);
  if (!contract) return null;
  const skillsTotal = roundMoney((contract.skillLines || []).reduce((sum, line) => sum + Number(line.price || 0), 0));
  const calculatedSubtotal = roundMoney(Number(contract.basePrice || 0) + skillsTotal);
  const subtotal = roundMoney(contract.subtotal ?? calculatedSubtotal);
  const discountAmount = roundMoney(contract.discountAmount || 0);
  const taxAmount = roundMoney(contract.taxAmount || 0);
  const calculatedTotal = roundMoney(subtotal - discountAmount + taxAmount);
  const paidTotal = roundMoney((contract.payments || [])
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + Number(payment.amountPaid || 0), 0));
  return {
    basePrice: roundMoney(contract.basePrice || 0),
    skillsTotal,
    subtotal,
    discountAmount,
    taxAmount,
    calculatedTotal,
    recordedTotal: roundMoney(contract.totalPaid || 0),
    paidTotal,
    isConsistent: calculatedSubtotal === subtotal && calculatedTotal === roundMoney(contract.totalPaid || 0) && paidTotal === roundMoney(contract.totalPaid || 0)
  };
}

function getContractStatusLabel(status) {
  return ({ active: 'Activo', completed: 'Finalizado', cancelled: 'Cancelado' })[status] || 'Desconocido';
}

function softDelete(collectionName, id) {
  const collection = appState[collectionName];
  const record = collection?.find(item => item.id === id);
  if (!record || record.deletedAt || record.archivedAt) return null;
  const field = collectionName === 'skills' ? 'archivedAt' : 'deletedAt';
  record[field] = new Date().toISOString();
  return record;
}

function restoreRecord(collectionName, id) {
  const collection = appState[collectionName];
  const record = collection?.find(item => item.id === id);
  if (!record) return false;
  delete record.deletedAt;
  delete record.archivedAt;
  return true;
}

function deleteUser(userId) {
  return softDelete('users', userId);
}

function restoreUser(userId) {
  return restoreRecord('users', userId);
}

function deleteAgent(agentId) {
  return softDelete('agents', agentId);
}

function restoreAgent(agentId) {
  return restoreRecord('agents', agentId);
}

function archiveSkill(skillId) {
  return softDelete('skills', skillId);
}

function restoreSkill(skillId) {
  return restoreRecord('skills', skillId);
}

function resolveErrorLog(errorId) {
  const log = getErrorLogById(errorId);
  if (!log || log.status === 'resolved') return false;
  log.status = 'resolved';
  log.resolvedAt = new Date().toISOString();
  return true;
}

function getVisibleRecords(collectionName) {
  return (appState[collectionName] || []).filter(record => !record.deletedAt && !record.archivedAt);
}

function createStateSnapshot() {
  return JSON.stringify(appState);
}

function restoreStateSnapshot(snapshot) {
  try {
    const parsed = JSON.parse(snapshot);
    if (!parsed || !Array.isArray(parsed.users) || !Array.isArray(parsed.agents) || !Array.isArray(parsed.contracts) || !Array.isArray(parsed.errorLogs)) return false;
    appState = parsed;
    return true;
  } catch {
    return false;
  }
}
