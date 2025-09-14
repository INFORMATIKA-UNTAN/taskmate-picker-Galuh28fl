import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 

export default function TaskItem({ task, onToggle }) {
    const categoryColors = {
        Mobile: '#facc15', // kuning
        RPL: '#34d399',    // hijau
        IoT: '#60a5fa',    // biru
    };
    const isDone = task.status === 'done'; 
    return ( 
        <TouchableOpacity onPress={() => onToggle?.(task)} activeOpacity={0.7}> 
        <View style={[styles.card, isDone && styles.cardDone]}> 
            <View style={{ flex: 1 }}> 
                <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text> 
                <Text style={styles.desc}>{task.description}</Text> 
                <View style={[styles.badge, { backgroundColor: categoryColors[task.category] || '#e5e7eb' }]}>
                    <Text style={styles.badgeText}>{task.category}</Text>
                </View>
                <Text style={styles.meta}>Due {task.deadline}</Text> 
            </View> 
            <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}> 
            <Text style={styles.badgeText}>{isDone ? 'Done' : 'Todo'}</Text> 
            </View> 
        </View> 
        </TouchableOpacity> 
    ); 
} 
const styles = StyleSheet.create({ 
card: { padding: 14, borderRadius: 12, backgroundColor: '#fff', 
marginBottom: 10, flexDirection: 'row', alignItems: 'center', 
elevation: 1 }, 
cardDone: { backgroundColor: '#f1f5f9' }, 
title: { fontSize: 16, fontWeight: '600', marginBottom: 4 }, 
strike: { textDecorationLine: 'line-through', color: '#64748b' }, 
desc: { color: '#475569', marginBottom: 6 }, 
meta: { fontSize: 12, color: '#64748b' }, 
badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, 
marginLeft: 12 }, 
badgePending: { backgroundColor: '#fee2e2' }, 
badgeDone: { backgroundColor: '#dcfce7' }, 
badgeText: { fontWeight: '700', fontSize: 12},
badge: {
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
}); 