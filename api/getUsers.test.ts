import axios from 'axios';
import { getUsers } from './getUsers';

jest.mock('axios');

it('should return a successful response if the GET request was successful', async () => {
	const mockResponse = {
		data: {
			results: [{ name: 'Foo' }]
		}
	};

	axios.get = jest.fn().mockResolvedValue(mockResponse);

	const peopleData = await getUsers();

	expect(mockResponse.data).toEqual(peopleData);
});
