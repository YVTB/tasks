import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import { useNavigation } from 'expo-router';
import Header from '@/components/Header';
import { getInitials } from '@/util/getInitials';
import { User } from '@/interfaces/user';
import { getUsers } from '@/api/getUsers';

const UserItem: React.FC<{ item: User }> = ({ item }) => {
	const [imgErrror, setImgError] = useState(false);

	return (
		<View style={styles.itemContainer}>
			{!imgErrror ? (
				<Image
					testID={`avatar-${item.id}`}
					source={{ uri: item.avatar }}
					style={styles.avatar}
					onError={() => {
						setImgError(true);
					}}
				/>
			) : (
				<View style={[styles.avatar, styles.initialsBackground]}>
					<Text style={styles.initialsText}>{getInitials(item.name)}</Text>
				</View>
			)}
			<Text style={styles.name}>{item.name}</Text>
		</View>
	);
};

const UsersList: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => (
				<Header title='List' onPressBack={() => navigation.goBack()} />
			)
		});
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await getUsers();
				setUsers(response);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator style={styles.loader} testID='loader' size='large' />
			) : (
				<FlatList
					style={styles.list}
					data={users}
					renderItem={({ item }) => <UserItem item={item} />}
					keyExtractor={item => item.id}
					contentContainerStyle={{ paddingBottom: 30 }}
				/>
			)}
		</View>
	);
};

export default UsersList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	loader: {
		marginTop: 20
	},
	list: {
		width: '100%',
		paddingHorizontal: 10,
		paddingTop: 15
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		width: '100%'
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10
	},
	initialsBackground: {
		backgroundColor: '#c7dcf9',
		justifyContent: 'center',
		alignItems: 'center'
	},
	initialsText: {
		color: 'white',
		fontSize: 18
	},
	name: {
		fontSize: 18,
		paddingLeft: 15
	}
});
