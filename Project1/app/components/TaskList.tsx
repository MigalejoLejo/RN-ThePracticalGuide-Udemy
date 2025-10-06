import { FlatList, SectionList } from "react-native"
import { HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { TaskItem } from "../models/TaskItem";
import { useEffect, useState } from "react";
import { COLORS } from "../constants/Colors";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import TaskListItem from "./TaskListItem";

type Props = {
    taskItems: TaskItem[];
    setTaskItems: (items: TaskItem[]) => void
}
const TaskList = ({ taskItems, setTaskItems }: Props) => {

    if (
        Platform.OS === "android" &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const handleTaskItemPress = (key: string) => {
        if (!taskItems) return;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const updatedTaskItems: TaskItem[] = taskItems.map((item: TaskItem) => {
            if (item.key === key) {

                return { ...item, isDone: !item.isDone } as TaskItem
            }
            return item;
        });
        setTaskItems(updatedTaskItems);
    }
    const handleDeleteTask = (key: string) => {
        if (!taskItems) return;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updatedTaskItems = taskItems.filter((item) => item.key !== key);
        setTaskItems(updatedTaskItems);
    };

    return (
        <>
            {taskItems !== undefined ?
                <FlatList<TaskItem>
                    style={{ paddingVertical: 20 }}
                    data={taskItems.sort((a, b) => {
                        return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1
                    })}
                    keyExtractor={(item: TaskItem) => item.key}
                    renderItem={({ item }) => (


                        <TaskListItem item={item} onPress={handleTaskItemPress} onDelete={handleDeleteTask} />

                    )}
                />
                : null
            }
        </>
    )
}

export default TaskList;



//  const handleSwipeableOpen = (direction: string, item: TaskItem) => {
//         if (direction === 'left') {
//             handleDeleteTask(item.key);
//         }
//     }


//     const renderRightActions = (item: TaskItem) => (
//         <Pressable
//             onPress={() => handleDeleteTask(item.key)}
//             style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: 20,
//                 marginRight: 30,
//                 height: '100%',
//                 borderTopRightRadius: 10,
//                 borderBottomRightRadius: 10,
//             }}
//         >
//             <Ionicons name="trash" size={24} color="#ff3b30" />
//         </Pressable>
//     );