import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import TaskComponent from '../../app/tasks';

const mockStore = configureStore([]);
const store = mockStore({
  tasks: {
    tasks: []
  }
});

jest.mock('expo-router', () => {
  const originalModule = jest.requireActual('expo-router');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

describe('TaskComponent', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <TaskComponent />
      </Provider>
    );
    expect(screen.getByText('Add Task')).toBeTruthy();
  });

  it('opens modal on button press', () => {
    render(
      <Provider store={store}>
        <TaskComponent />
      </Provider>
    );
    fireEvent.press(screen.getByText('Add Task'));
    expect(screen.getByPlaceholderText('Enter task title')).toBeTruthy();
  });

  it('adds a new task', () => {
    render(
      <Provider store={store}>
        <TaskComponent />
      </Provider>
    );
    fireEvent.press(screen.getByText('Add Task'));
    fireEvent.changeText(screen.getByPlaceholderText('Enter task title'), 'New Task');
    fireEvent.press(screen.getByText('Save New Task'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('tasks/addTask');
    expect(actions[0].payload).toEqual({ id: expect.any(Number), title: 'New Task' });
  });
});
