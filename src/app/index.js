import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as todoService from '../services/todoService';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await todoService.getTodos();
      setTodoList(response.rows ?? []);
    } catch (error) {
      console.error('Could not load todos:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    const title = todo.trim();
    if (!title) return;
    try {
      const newTodo = await todoService.addTodo(title);
      setTodoList((current) => [...current, newTodo]);
      setTodo('');
    } catch (error) {
      console.error('Could not add todo:', error);
    }
  };

  const startEditing = (item) => {
    setEditingId(item.$id);
    setEditText(item.title ?? item.name ?? '');
  };

  const saveEdit = async (id) => {
    const title = editText.trim();
    if (!title) return;
    try {
      const updatedTodo = await todoService.updateTodo(id, { title });
      setTodoList((current) => current.map((item) => item.$id === id ? updatedTodo : item));
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Could not update todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await todoService.removeTodo(id);
      setTodoList((current) => current.filter((item) => item.$id !== id));
      if (editingId === id) setEditingId(null);
    } catch (error) {
      console.error('Could not delete todo:', error);
    }
  };

  const handleToggleComplete = async (todoItem) => {
    try {
      // 1. Toggle the completed status in Appwrite database
      const updatedTodo = await todoService.updateTodo(todoItem.$id, { completed: !todoItem.completed });

      // 2. Update local state directly with returned item
      setTodoList((current) =>
        current.map((item) => (item.$id === todoItem.$id ? updatedTodo : item))
      );
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  const renderTask = ({ item }) => {
    const isEditing = editingId === item.$id;
    const isCompleted = Boolean(item.completed);

    return (
      <View style={styles.todoItem}>
        {/* Checkbox for toggling complete state */}
        <Pressable 
          accessibilityLabel="Toggle completion" 
          onPress={() => handleToggleComplete(item)}
          style={styles.checkboxContainer}
        >
          <MaterialIcons 
            name={isCompleted ? "check-box" : "check-box-outline-blank"} 
            size={24} 
            color={isCompleted ? "#820f0f" : "#888"} 
          />
        </Pressable>

        {isEditing ? (
          <TextInput
            style={[styles.todoText, styles.editInput]}
            value={editText}
            onChangeText={setEditText}
            onSubmitEditing={() => saveEdit(item.$id)}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={[styles.todoText, isCompleted && styles.completedText]}>
            {item.title ?? item.name}
          </Text>
        )}
        <View style={styles.actionButtons}>
          {isEditing ? (
            <>
              <Pressable accessibilityLabel="Save todo" onPress={() => saveEdit(item.$id)} style={styles.iconButton}>
                <MaterialIcons name="check" size={22} color="#fff" />
              </Pressable>
              <Pressable accessibilityLabel="Cancel editing" onPress={() => setEditingId(null)} style={[styles.iconButton, styles.cancelButton]}>
                <MaterialIcons name="close" size={22} color="#fff" />
              </Pressable>
            </>
          ) : (
            <Pressable accessibilityLabel="Edit todo" onPress={() => startEditing(item)} style={[styles.iconButton, styles.editButton]}>
              <MaterialIcons name="edit" size={20} color="#fff" />
            </Pressable>
          )}
          <Pressable accessibilityLabel="Delete todo" onPress={() => removeTodo(item.$id)} style={[styles.iconButton, styles.deleteButton]}>
            <MaterialIcons name="delete" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTodos();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO DO Lists</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What do you need to do?"
          placeholderTextColor="#888"
          value={todo}
          onChangeText={setTodo}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <Pressable accessibilityLabel="Add todo" onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={todoList}
        renderItem={renderTask}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one above.</Text>}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb', paddingTop: 48 },
  header: { fontSize: 28, fontWeight: '700', color: '#9f0a0a', textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 15, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5, elevation: 3 },
  input: { flex: 1, fontSize: 18, padding: 10, color: '#2b2d42' },
  addButton: { backgroundColor: '#820f0f', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 28, fontWeight: '700' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20, flexGrow: 1 },
  todoItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 2 },
  checkboxContainer: { marginRight: 10 },
  todoText: { flex: 1, fontSize: 18, color: '#2b2d42' },
  completedText: { textDecorationLine: 'line-through', color: '#888' },
  editInput: { borderBottomWidth: 1, borderBottomColor: '#820f0f', marginRight: 8, paddingVertical: 4 },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 8 },
  iconButton: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 8 },
  editButton: { backgroundColor: '#1976d2' },
  cancelButton: { backgroundColor: '#777' },
  deleteButton: { backgroundColor: '#c62828' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 48, fontSize: 16 },
});