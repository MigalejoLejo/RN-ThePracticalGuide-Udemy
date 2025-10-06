import { Button, HStack, Input, InputField, Modal, Pressable, Text, View } from "@gluestack-ui/themed"
import { COLORS } from "../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";



const AddTaskButton = ({ action }) => {

    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');


    function handleButtonPressed() {
        setShowModal(true)
    }

    function dismiss() {
        setShowModal(false)
        setInput('')
    }

    function onAddTask() {
        action(input)
        dismiss()
    }

    return (

        <>
            <Pressable onPress={handleButtonPressed}>
                {
                    ({ pressed }) => (<View
                        w={60} height={60}
                        bgColor={COLORS.accents.blue}
                        borderRadius={100}
                        justifyContent="center"
                        alignItems="center"

                        style={{
                            transform: [{ scale: pressed ? 0.9 : 1 }],
                            shadowColor: '#585858ff',
                            shadowOffset: {
                                width: 0, height: 3
                            },
                            shadowOpacity: 0.8,
                            shadowRadius: 3
                        }}>

                        <Ionicons name="add" size={32} color="white" />
                    </View>)
                }

            </Pressable>



            <Modal isOpen={showModal} >
                <View  h={'100%'} w={'100%'} bg="hsla(0, 0%, 23%, 0.45)" justifyContent="center" alignItems="center">
                    <View position={'absolute'} top={200} w={'90%'} bg={COLORS.bg.lightA} borderRadius={15}
                        style={{
                            shadowColor: '#232323ff',
                            shadowOffset: {
                                width: 0, height: 2
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 2
                        }}
                        p={20}
                    >
                        <Input>
                            <InputField placeholder="Enter Task..." value={input} onChangeText={setInput} />
                        </Input>


                        <HStack gap={10} justifyContent={'center'} alignItems={'center'} my={10}>



                            <Button bg={COLORS.accents.red} onPress={dismiss}>
                                <Button.Text>Cancel</Button.Text>
                            </Button>

                            <Button bg={COLORS.accents.blueDark} onPress={onAddTask}>
                                <Button.Text color={'#fff'}>Add Task</Button.Text>
                            </Button>
                        </HStack>

                    </View>
                </View>
            </Modal>

        </>

    )
}

export default AddTaskButton;