import React from 'react';
import {
	render,
	screen,
	waitFor,
} from '@testing-library/react-native';
import UsersList from '../../app/list';
import { User } from '@/interfaces/user';
import { getUsers } from '@/api/getUsers';

jest.mock('expo-router', () => {
	const originalModule = jest.requireActual('expo-router');
	return {
		...originalModule,
		useNavigation: () => ({
			navigate: jest.fn(),
			goBack: jest.fn(),
			setOptions: jest.fn()
		})
	};
});

jest.mock('axios');
jest.mock('../../api/getUsers.ts');

describe('UsersList', () => {
	it('shows a loading indicator while fetching data', () => {
		const { getByTestId } = render(<UsersList />);
		expect(getByTestId('loader')).toBeTruthy();
	});

	it('renders user data after fetching', async () => {
		const mockResults: User[] = [
			{
				id: '1',
				name: 'John Doe',
				avatar: 'http://example.com/avatar1.jpg',
				createdAt: '2021-10-01T12:34:56.000Z'
			},
			{
				id: '2',
				name: 'Jane Smith',
				avatar: 'http://example.com/avatar2.jpg',
				createdAt: '2021-11-01T12:34:56.000Z'
			}
		];

		(getUsers as jest.Mock).mockResolvedValue({
			results: mockResults
		});

		render(<UsersList />);

		await waitFor(() => {
			expect(screen.findByText('John Doe')).toBeTruthy();
			expect(screen.findByText('Jane Smith')).toBeTruthy();
		});
	});
});
