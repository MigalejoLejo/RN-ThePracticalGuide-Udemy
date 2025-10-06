import { Button, ButtonText, Divider, Input, InputField, View } from "@gluestack-ui/themed";
import { COLORS } from "../constants/colors";
import { Platform } from "react-native";
import { useState } from "react";

type Props = {
    buttonAction: any;
}
function AddTaskButton({ buttonAction }: Props) {
    const [input, setInput] = useState('');

    function handleOnTextChange(value: any) {
        setInput(value)
        console.log(value)
    }

    async function handelOnAddTaskPressed() {
        if (!buttonAction) {
            console.log('task not added')
            return
        }
        buttonAction(input)
        setInput('')
        console.log('task added')
    }


    return (
        <>
            <View flexDirection='row' justifyContent='center' alignItems='center' mt={Platform.OS === 'ios' ? 40 : 80} mb={10} gap={5} mx={20}>
                <Input width={'70%'} borderBottomColor={COLORS.myBlue} borderBottomWidth={2} >
                    <InputField placeholder="Enter Text here..." onChangeText={handleOnTextChange} value={input} />
                </Input>
                <Button onPress={handelOnAddTaskPressed}>
                    <ButtonText>Add Task</ButtonText>
                </Button>
            </View>

            <Divider width={'100%'} height={2} bg={COLORS.myBlue} my={10} />
        </>
    )
}

export default AddTaskButton