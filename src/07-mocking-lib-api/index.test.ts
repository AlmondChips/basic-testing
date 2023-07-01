// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    const spiedCreate = jest.spyOn(axios, 'create');
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('test');
    await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(spiedCreate).toBeCalled();
    jest.clearAllMocks();
  });

  test('should perform request to correct provided url', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('test');
    const spiedGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(spiedGet).toBeCalled();
  });

  test('should return response data', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue({ data: 'test' });
    const data = await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(data).toBe('test');
  });
});
