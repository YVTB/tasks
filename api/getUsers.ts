import { User } from '@/interfaces/user';
import axios, { AxiosResponse } from 'axios';

export const getUsers = async (): Promise<User[]> => {
		const response: AxiosResponse<User[]> = await axios.get(
			'https://6172cfe5110a740017222e2b.mockapi.io/elements'
		);
		return response.data;
};
