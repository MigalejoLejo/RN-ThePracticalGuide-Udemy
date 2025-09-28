import { useState } from 'react';
import { config } from '@gluestack-ui/config';
import { Button, ButtonText, Divider, GluestackUIProvider, Input, InputField, Pressable, SafeAreaView, Text, TextareaInput, View } from '@gluestack-ui/themed';

import { StatusBar } from 'expo-status-bar';
import { uuid } from 'expo-modules-core';
import { DragItem } from '@react-types/shared';
import { FlatList, SectionList } from 'react-native';

export default function App() {

  type Item = {
    key: string;
    value: string;
    isDone: boolean;
  }

  const [input, setInput] = useState('');
  const [items, setItems] = useState<Item[] | undefined>([]);

  const handleInput = (input) => {
    setInput(input);
  }

  const handleAddItem = () => {
    if (input.length === 0) return;
    const newItem: Item = {
      key: uuid.v4().toString(),
      value: input,
      isDone: false
    }
    if (!items) {
      setItems([newItem]);
    } else {
      setItems([...items, newItem]);
    }
    setInput('');
  }


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

  const myBlue = "#327bc0ff";

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView flex={1}>

        <StatusBar style="auto" />

        <View flex={1} flexDirection='column' >

          <View flexDirection='row' justifyContent='center' alignItems='center' mt={40} mb={10} gap={5} mx={20}>
            <Input w={'70%'} size="md" variant="outline" borderBottomColor={myBlue} borderBottomWidth={2} >
              <InputField placeholder="Enter Text here..." onChangeText={handleInput} value={input} />
            </Input>
            <Button variant="solid" size="md" action="primary" onPress={handleAddItem}>
              <ButtonText>Add Task</ButtonText>
            </Button>
          </View>

          <Divider w={'100%'} height={2} bg={myBlue} my={10} />


          {/* {items.length > 0 && items.sort((a, b)=>(Number(a.isDone) - Number(b.isDone))) && (
            <FlatList<Item>
              data={items}
              keyExtractor={(item: Item) => item.key}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleItemPress(item.key)}>
                  <View mx={20} my={5}>
                    <Text fontSize={20} color={item.isDone ? "$warmGray400" : "$black"}>{(!item.isDone ? '[   ]  ' : '✅   ') + item.value}</Text>
                  </View>
                </Pressable>
              )}
            />
          )
          } */}


          <SectionList<Item>
            sections={[{ title: 'My Tasks', data: items.filter(item => !item.isDone) }, { title: items.length === 0 ? '' : 'Done', data: items.filter(item => item.isDone) }]}
            keyExtractor={(item: Item) => item.key}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleItemPress(item.key)}>
                <View mx={20} my={5}>
                  <Text fontSize={20} color={item.isDone ? "$warmGray400" : "$black"}>{(!item.isDone ? '[   ]  ' : '✅   ') + item.value}</Text>
                </View>
              </Pressable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text fontSize={30} mx={20} mt={20} mb={10} bold color={myBlue}>{title}</Text>

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






        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
