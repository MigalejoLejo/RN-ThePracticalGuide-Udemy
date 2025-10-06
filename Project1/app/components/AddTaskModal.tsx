import { Button, HStack, Input, InputField, Modal, View } from "@gluestack-ui/themed";
import { COLORS } from "@/constants/Colors";
import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";

const AddTaskModal = ({ isOpen, setIsOpen, input, setInput, action }) => {
    const [visible, setVisible] = useState(isOpen);
    const scale = useRef(new Animated.Value(0.9)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<any>(null);

    // Keep internal visible in sync with external isOpen
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            // trigger close animation
            Animated.parallel([
                Animated.timing(scale, { toValue: 0.9, duration: 250, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
            ]).start(() => setVisible(false));
        }
    }, [isOpen]);

    // 🟩 Animate open only when visible becomes true
    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(scale, { toValue: 1, duration: 250, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    const dismiss = () => {
        setIsOpen(false); // triggers close animation via useEffect
        setInput("");
    };

    const onAddTask = () => {
        action(input);
        dismiss();
    };


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100); // slight delay for modal animation
        }
    }, [isOpen]);

    if (!visible) return null;


    return (
        <Modal isOpen={true}>
            <Animated.View style={{
                opacity,
                height: '100%',
                width: '100%',
                backgroundColor: "hsla(0, 0%, 23%, 0.45)",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 200,
                        transform: [{ scale }],
                        opacity,
                        width: "90%",
                        backgroundColor: COLORS.bg.lightA,
                        borderRadius: 15,
                        shadowColor: "#232323ff",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        padding: 20,
                    }}
                >
                    <Input mt={15}>
                        <InputField placeholder="Enter Task..." value={input} onChangeText={setInput} ref={inputRef} />
                    </Input>

                    <HStack gap={10} justifyContent="center" alignItems="center" mt={25} mb={10}>
                        <Button flex={1} bg={COLORS.accents.red} onPress={dismiss} borderRadius={10}>
                            <Button.Text>Cancel</Button.Text>
                        </Button>

                        <Button flex={1} bg={COLORS.accents.blueDark} onPress={onAddTask} borderRadius={10}>
                            <Button.Text color="#fff">Add Task</Button.Text>
                        </Button>
                    </HStack>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

export default AddTaskModal;