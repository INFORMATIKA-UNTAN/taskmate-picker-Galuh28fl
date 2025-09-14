import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import TaskItem from '../src/components/Taskitem.jsx';
import { dummyTasks } from '../src/data/dummyTasks.js';

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState('all'); // <- filter state

  const handleToggle = (task) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
      )
    );
  };

  // filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'todo') return task.status !== 'done';
    if (filter === 'done') return task.status === 'done';
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'todo' && styles.activeFilter]}
          onPress={() => setFilter('todo')}
        >
          <Text style={styles.filterText}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'done' && styles.activeFilter]}
          onPress={() => setFilter('done')}
        >
          <Text style={styles.filterText}>Done</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 8,
  },
  filterButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeFilter: {
    backgroundColor: '#0ea5e9',
  },
  filterText: {
    color: '#000',
    fontWeight: '600',
  },
});
