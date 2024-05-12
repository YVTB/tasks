import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { Link, useNavigation } from 'expo-router';

const index = () => {
	const navigation = useNavigation<any>();
	return (
		<View style={styles.container}>
			<Link href='/tasks' asChild>
				<Pressable style={styles.button}>
					<Text style={styles.title}>Tasks</Text>
				</Pressable>
			</Link>
			<Link href='/list' asChild>
				<Pressable style={styles.button}>
					<Text style={styles.title}>List</Text>
				</Pressable>
			</Link>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	link: {
		width: '80%'
	},
	button: {
		backgroundColor: '#c7dcf9',
		width: '80%',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5
	}
});
