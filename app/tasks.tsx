import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Pressable,
	Modal,
	TextInput,
	ScrollView,
	StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask, deleteTask } from '../redux/taskSlice';
import { useNavigation } from 'expo-router';
import Header from '@/components/Header';

const TaskComponent: React.FC = () => {
	const navigation = useNavigation();
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const dispatch = useDispatch<AppDispatch>();
	const [modalVisible, setModalVisible] = useState(false);
	const [newTaskTitle, setNewTaskTitle] = useState('');

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			header: () => (
				<Header title='Tasks' onPressBack={() => navigation.goBack()} />
			)
		});
	}, []);

	const handleAddTask = () => {
		dispatch(addTask({ id: Math.random(), title: newTaskTitle })); // Using Math.random() for unique id generation
		setNewTaskTitle('');
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
				<Text style={styles.buttonText}>Add Task</Text>
			</Pressable>

			<ScrollView style={styles.listContainer}>
				{tasks.map(task => (
					<View key={task.id} style={styles.taskContainer}>
						<View style={styles.taskContentContainer}>
							<Text style={styles.taskContent}>{task.title}</Text>
						</View>
						<Pressable
							style={styles.deleteTaskButton}
							onPress={() => dispatch(deleteTask(task.id))}
						>
							<Text style={styles.deleteText}>Delete</Text>
						</Pressable>
					</View>
				))}
			</ScrollView>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<Pressable
					onPress={() => setModalVisible(false)}
					style={styles.centeredView}
				>
					<View style={styles.modalView}>
						<TextInput
							style={styles.textInput}
							placeholder='Enter task title'
							value={newTaskTitle}
							onChangeText={setNewTaskTitle}
						/>
						<Pressable
							style={styles.addTaskButton}
							disabled={!newTaskTitle}
							onPress={handleAddTask}
						>
							<Text>{!newTaskTitle ? 'Cancel' : 'Save New Task'}</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};

export default TaskComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
	addButton: {
		backgroundColor: '#c7dcf9',
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
		width: '80%',
		marginTop: 15
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	listContainer: {
		paddingTop: 10,
		width: '80%'
	},
	taskContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		maxWidth: '100%',
		paddingVertical: 10
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	addTaskButton: {
		backgroundColor: '#c7dcf9',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5,
		width: '80%'
	},
	textInput: {
		height: 40,
		width: 200,
		marginBottom: 20,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5
	},
	taskContentContainer: {
		maxWidth: '75%'
	},
	taskContent: {
		fontSize: 15,
		textAlign: 'justify'
	},
	deleteTaskButton: {
		backgroundColor: '#c70000',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 5
	},
	deleteText: {
		color: '#FFF'
	}
});
