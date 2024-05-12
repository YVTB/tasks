import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderType = {
	onPressBack?: () => void;
	title: string;
};

const Header = ({ title, onPressBack }: HeaderType) => {
	const insets = useSafeAreaInsets();
	return (
		<View style={{ paddingTop: insets.top, paddingLeft: insets.left }}>
			<View style={styles.container}>
				{onPressBack && (
					<View style={styles.goBackContainer}>
						<Pressable onPress={onPressBack} testID='back-button'>
							<FontAwesome
								name='angle-left'
								size={28}
								style={{ marginBottom: -3 }}
							/>
						</Pressable>
					</View>
				)}
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 16,
		position: 'relative'
	},
	goBackContainer: {
		position: 'absolute',
		padding: 10,
		left: 5,
		zIndex: 99
	},
	title: {
		justifyContent: 'center',
		fontSize: 15,
		fontWeight: 'bold'
	}
});
