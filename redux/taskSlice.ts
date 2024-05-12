import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';

interface TaskState {
	tasks: Task[];
}

const initialState: TaskState = {
	tasks: []
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<Task>) {
			state.tasks.push(action.payload);
		},
		deleteTask(state, action: PayloadAction<number>) {
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
		}
	}
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
