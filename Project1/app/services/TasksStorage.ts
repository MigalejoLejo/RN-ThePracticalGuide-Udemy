import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskItem } from '../models/TaskItem';

const STORAGE_KEY = 'TASK_ITEMS';

export const saveTasks = async (tasks: TaskItem[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Error saving tasks:', err);
  }
};

export const loadTasks = async (): Promise<TaskItem[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.warn('Error loading tasks:', err);
    return [];
  }
};