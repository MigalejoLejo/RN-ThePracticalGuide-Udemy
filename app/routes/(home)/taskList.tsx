import { Text, View } from "@gluestack-ui/themed"
import { useState } from "react";
import { Pressable, SectionList } from "react-native"
import { TaskItem } from "app/models/Items";
import { COLORS } from "app/constants/colors";
import AddTaskButton from "app/components/AddTaskButton";
import uuid from 'react-native-uuid';

function TaskList() {
  console.log("✅ TaskList mounted");
  const [items, setItems] = useState<TaskItem[] | undefined>([]);

  const handleItemPress = (key: string) => {
    if (!items) return;
    const updatedItems = items.map(item => {
      if (item.key === key) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setItems(updatedItems);
  }


  const handleAddItem = (itemTitle: string) => {
    if (itemTitle.length === 0) return;
    const newItem: TaskItem = {
      key: uuid.v4().toString(),
      value: itemTitle,
      isDone: false
    }
    if (!items) {
      setItems([newItem]);
    } else {
      setItems([...items, newItem]);
    }
  }

  return (
    <View flex={1} flexDirection='column' >

      <AddTaskButton buttonAction={handleAddItem} />

      {items !== undefined && items.length !== 0 && <SectionList<TaskItem>
        sections={[
          { title: 'My Tasks', data: items.filter(item => !item.isDone) },
          { title: items.length === 0 ? '' : 'Done', data: items.filter(item => item.isDone) }
        ]}
        keyExtractor={(item: TaskItem) => item.key}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleItemPress(item.key)}>
            <View mx={20} my={5}>
              <Text fontSize={20} color={item.isDone ? "$warmGray400" : "$black"}>{(!item.isDone ? '[   ]  ' : '✅   ') + item.value}</Text>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text fontSize={30} mx={20} mt={20} mb={10} bold color={COLORS.myBlue}>{title}</Text>
        )}
        renderSectionFooter={({ section }) =>
          // only render footer if the whole list has items
          items.length > 0 && section.data.length === 0 ? (
            section.title === "My Tasks" ? (
              <Text mx={20} mb={10} color="$warmGray400">
                All done! Great job!
              </Text>
            ) : (
              <Text mx={20} mb={10} color="$warmGray400">
                No tasks done yet. Keep going!
              </Text>
            )
          ) : null
        }
      />
      }






    </View>

  )
}

export default TaskList