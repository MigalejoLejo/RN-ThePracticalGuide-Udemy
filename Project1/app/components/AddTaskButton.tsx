import { Button, HStack, Input, InputField, Modal, Pressable, Text, View } from "@gluestack-ui/themed"
import { COLORS } from "../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";



const AddTaskButton = ({ action }) => {

    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState('');

    function handleButtonPressed() {
        setShowModal(true)
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

            <AddTaskModal isOpen={showModal} setIsOpen={setShowModal} input={input} setInput={setInput} action={action} />

        </>

    )
}

export default AddTaskButton;