import { useState } from 'react';
import { config } from '@gluestack-ui/config';
import { Button, ButtonText, Divider, GluestackUIProvider, HStack, Input, InputField, Modal, Pressable, SafeAreaView, Text, TextareaInput, View, VStack } from '@gluestack-ui/themed';

import { StatusBar } from 'expo-status-bar';
import { uuid } from 'expo-modules-core';
import { DragItem } from '@react-types/shared';
import { FlatList, Platform, SectionList } from 'react-native';
import { TaskItem } from './app/models/TaskItem';
import TaskList from './app/components/TaskList';
import { COLORS } from './app/constants/Colors';
import AddTaskButton from './app/components/AddTaskButton';

export default function App() {


  const [taskItems, setTaskItems] = useState<TaskItem[] | undefined>([]);


  const handleAddTaskItem = (taskTitle) => {
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
    <GluestackUIProvider config={config}>
      <SafeAreaView flex={1} bg={COLORS.bg.lightA} >
        <View flex={1} bg={COLORS.bg.lightC}>


          <StatusBar style="auto" />

          <View justifyContent='center' alignItems='center' bg={COLORS.bg.lightA} borderBottomWidth={1} borderBottomColor={COLORS.accents.blueLight} p={20}>
            <Text fontSize={25} bold color={COLORS.accents.blueDark}>My Tasks</Text>
          </View>

          <TaskList taskItems={taskItems} setTaskItems={setTaskItems} />




          <View position='absolute' bottom={0} right={0} m={30} >
            <AddTaskButton action={(val) => handleAddTaskItem(val)} />
          </View>

        </View>

      </SafeAreaView>
    </GluestackUIProvider>
  );
}
