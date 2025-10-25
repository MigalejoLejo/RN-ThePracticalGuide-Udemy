

import { StyleSheet } from 'react-native';

import { auth } from '@/config/firebase';
import { ThemedText } from '@/presentation/components/themed-text';
import { ThemedView } from '@/presentation/components/themed-view';



export default function AuthScreen() {

    console.log({ auth: auth.currentUser })

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{"Hello World :-)"}</ThemedText>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
