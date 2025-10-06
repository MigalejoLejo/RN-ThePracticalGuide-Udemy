import { FlatList } from "react-native"
import { TaskItem } from "../models/TaskItem";
import TaskListItem from "./TaskListItem";

type Props = {
    taskItems: TaskItem[];
    setTaskItems: (items: TaskItem[]) => void
}
const TaskList = ({ taskItems, setTaskItems }: Props) => {


    const handleTaskItemPress = (key: string) => {
        if (!taskItems) return;

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