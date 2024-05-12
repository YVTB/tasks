import React from 'react';
import {
	render,
	screen,
} from '@testing-library/react-native';
import Header from '../Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

describe('Header', () => {
	it('renders the provided title', async () => {
		render(
			<SafeAreaProvider>
				<Header title='Test Title' />
			</SafeAreaProvider>
		);

		expect(screen.findByText('Test Title')).toBeTruthy();
	});

	it('renders back button when onPressBack is provided', () => {
		const mockOnPressBack = jest.fn();
		render(
			<SafeAreaProvider>
				<Header title='Test Title' onPressBack={mockOnPressBack} />
			</SafeAreaProvider>
		);
		const backButton = screen.findByTestId('back-button');
		expect(backButton).toBeTruthy();
	});

	it('does not render back button when onPressBack is not provided', () => {
		render(
			<SafeAreaProvider>
				<Header title='Test Title' />
			</SafeAreaProvider>
		);
		const backButton = screen.queryByTestId('back-button');
		expect(backButton).toBeNull();
	});
});
