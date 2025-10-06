
import { useEffect, useState } from 'react';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text, View, VStack } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uuid } from 'expo-modules-core';
import { TaskItem } from '@/models/TaskItem';
import TaskList from '@/components/TaskList';
import { COLORS } from '@/constants/Colors';
import AddTaskButton from '@/components/AddTaskButton';
import { loadTasks, saveTasks } from '@/services/TasksStorage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

export default function MainScreen() {


    const [taskItems, setTaskItems] = useState<TaskItem[] | undefined>([]);
    useEffect(() => {
        loadTasks().then(setTaskItems);
    }, []);

    useEffect(() => {
        saveTasks(taskItems);
    }, [taskItems]);

    const handleAddTaskItem = (taskTitle: string) => {
        if (taskTitle.length === 0) return;
        const newTaskItem: TaskItem = {
            key: uuid.v4().toString(),
            value: taskTitle,
            isDone: false
        }
        if (!taskItems) {
            setTaskItems([newTaskItem]);
        } else {
            setTaskItems([...taskItems, newTaskItem]);
        }
    }



    return (
        <GestureHandlerRootView >

            <GluestackUIProvider config={config}>

                {Platform.OS !== 'web' && <SafeAreaView edges={['top']} style={{ backgroundColor: COLORS.bg.lightA }} />}
                <StatusBar style="auto" />

                <VStack flex={1} bg={COLORS.bg.lightC}>
                    <View height={Platform.OS !== 'web' ? 100 : 50} justifyContent='flex-end' alignItems='center' bg={COLORS.bg.lightA} borderBottomWidth={1} borderBottomColor={COLORS.accents.blueDark} pb={10}>
                        <Text fontSize={25} bold color={COLORS.accents.blueDark}>My Tasks</Text>
                    </View>

                   
                            <TaskList taskItems={taskItems} setTaskItems={setTaskItems} />
               

                    <View position='absolute' bottom={0} right={0} m={30} >
                        <AddTaskButton action={(val: string) => handleAddTaskItem(val)} />
                    </View>

                </VStack>

                {Platform.OS !== 'web' && <SafeAreaView edges={['bottom']} style={{ backgroundColor: COLORS.bg.lightA }} />}

            </GluestackUIProvider>
        </GestureHandlerRootView>
    );
}
