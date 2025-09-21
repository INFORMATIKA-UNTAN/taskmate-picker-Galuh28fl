import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { colorOfName } from '../constants/categories';
import { colorOfPriority } from '../constants/priorities';

export default function TaskItem({ task, categories, onToggle, onDelete }) {
  const isDone = task.status === 'done';
  // [UPDATE] Warna badge ambil dari util sesuai kategori & prioritas
  const catColor = colorOfName(task.category ?? 'Umum', categories);
  const prioColor = colorOfPriority(task.priority ?? 'Low');

  // [OPSIONAL] progress 0-100 → jika tidak ada, tidak dirender
  const pct = typeof task.progress === 'number' ? Math.max(0, Math.min(100, task.progress)) : null;

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      {/* [AKSI] Ketuk untuk toggle status Done/Pending */}
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }}>
        <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>

        {!!task.deadline && <Text style={styles.deadline}>Deadline: {task.deadline}</Text>}
        {!!task.description && <Text style={styles.desc}>{task.description}</Text>}

        {/* [UPDATE] Badge kategori & prioritas */}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <View style={[styles.badge, { borderColor: catColor, backgroundColor: `${catColor}20` }]}>
            <Text style={[styles.badgeText, { color: catColor }]}>{task.category ?? 'Umum'}</Text>
          </View>
          <View style={[styles.badge, { borderColor: prioColor, backgroundColor: `${prioColor}20` }]}>
            <Text style={[styles.badgeText, { color: prioColor }]}>{task.priority ?? 'Low'}</Text>
          </View>
        </View>

        {/* [OPSIONAL] Progress bar tipis */}
        {pct !== null && (
          <View style={styles.progressWrap}>
            <View style={[styles.progressBar, { width: `${pct}%` }]} />
            <Text style={styles.progressText}>{pct}%</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* [AKSI] Hapus task */}
      <Button title="🗑" onPress={() => onDelete?.(task)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14, borderRadius: 16, backgroundColor: '#fff', marginBottom: 12,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e2e8f0',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardDone: { backgroundColor: '#f8fafc' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: '#0f172a' },
  strike: { textDecorationLine: 'line-through', color: '#64748b' },
  deadline: { fontSize: 12, color: '#334155', marginBottom: 4 },
  desc: { color: '#475569' },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, borderWidth: 1 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  progressWrap: { marginTop: 10, height: 8, backgroundColor: '#e5e7eb', borderRadius: 999, overflow: 'hidden', position: 'relative' },
  progressBar: { height: '100%', backgroundColor: '#0f172a' },
  progressText: { position: 'absolute', right: 8, top: -18, fontSize: 12, color: '#334155', fontWeight: '600' },
});
