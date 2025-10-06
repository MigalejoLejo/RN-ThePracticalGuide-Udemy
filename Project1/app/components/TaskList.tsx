import { FlatList, SectionList } from "react-native"
import { HStack, Pressable, Text, View } from '@gluestack-ui/themed';
import { TaskItem } from "../models/TaskItem";
import { useState } from "react";
import { COLORS } from "../constants/Colors";
import { LayoutAnimation, Platform, UIManager } from "react-native";

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
                        <HStack bg={COLORS.bg.lightA}
                            my={4} py={5} mx={20}
                            borderRadius={10}
                            style={{
                                shadowColor: '#585858ff',
                                shadowOffset: {
                                    width: 1, height: 1
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 2
                            }}

                        >
                            <Pressable onPress={() => handleTaskItemPress(item.key)}>
                                <View mx={10} my={5}>
                                    <Text
                                        fontSize={20}
                                        color={item.isDone ? "$warmGray400" : "$black"}
                                        strikeThrough={item.isDone ? true : false}
                                    >
                                        {(item.isDone ? '[   ]  ' : '✅   ') + item.value}
                                    </Text>
                                </View>
                            </Pressable>
                        </HStack>
                    )}

                />
                : null
            }
        </>
    )
}

export default TaskList;
