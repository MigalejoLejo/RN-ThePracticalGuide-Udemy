import { StyleSheet } from "react-native"
import { Pressable, Text, View } from '@gluestack-ui/themed';
import { COLORS } from "../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, useDerivedValue, Layout, FadeIn, FadeOut, runOnJS } from "react-native-reanimated";

const TaskListItem = ({ item, onPress, onDelete }) => {

    const position = useSharedValue(0);
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (position.value > 0) {
                position.value = withTiming(0, { duration: 100 });
                return
            }

            if (position.value > -250) {
                position.value = withTiming(-50, { duration: 100 });
                return
            }
            if (position.value < -250) {
                position.value = withTiming(-300, { duration: 100 }, (finished) => {
                    if (finished) {
                        try {
                            runOnJS(onDelete)(item.key);
                        } catch (err) {
                            console.warn('could not delete item:', item.key, '- Error: ', err)
                        }
                    }
                })
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    const iconOpacity = useDerivedValue(() =>
        interpolate(
            position.value,
            [0, -50],
            [0, 1],
            'clamp'
        )
    );
    const iconStyle = useAnimatedStyle(() => ({
        opacity: iconOpacity.value,
        transform: [{ scale: interpolate(position.value, [0, -120], [1, 0.9], 'clamp') }]
    }));

    const styles = StyleSheet.create({
        backgroundBaseStyle: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 10
        }
    })

    return (
        <Animated.View
            layout={Layout.springify().mass(0.4).damping(18).stiffness(180)}
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(180)}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
                        {/* 🔴 Background delete layer */}
            <Animated.View style={[styles.backgroundBaseStyle, iconStyle]}>
                <Pressable onPress={() => onDelete(item.key)}>
                    <Ionicons name="trash-outline" size={26} color={COLORS.accents.red} />
                </Pressable>
            </Animated.View>

            <GestureDetector gesture={panGesture}>
                <Animated.View style={[animatedStyle]}>
                    <Pressable onPress={() => onPress(item.key)} style={[{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginVertical: 4,
                        padding: 12,
                        gap: 14,
                        borderRadius: 10,
                        backgroundColor: COLORS.bg.lightA,
                        shadowColor: '#585858ff',
                        shadowOffset: {
                            width: 1, height: 1
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 2
                    }]}>
                        <Ionicons name={item.isDone ? 'checkmark' : 'square-outline'} size={25} color={COLORS.accents.blueDark} />
                        <Text
                            w={'90%'}
                            fontSize={20}
                            color={item.isDone ? "$warmGray400" : "$black"}
                            strikeThrough={item.isDone ? true : false}
                        >
                            {item.value}
                        </Text>
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </Animated.View >
    )
}

export default TaskListItem
