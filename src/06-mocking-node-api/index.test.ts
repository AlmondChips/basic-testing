// Uncomment the code below and write your tests
import path, { join } from 'path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
// import { readFile } from 'fs/promises';
import fsPromises from 'fs/promises';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1);
    expect(setTimeout).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(setInterval).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const times = 3;
    const cb = jest.fn();
    doStuffByInterval(cb, interval);
    jest.advanceTimersByTime(interval * times);
    expect(cb).toBeCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  const fileText = 'Hello world';
  const pathToFile = './somePath/file.txt';

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn().mockReturnValue(false);
    const result = await readFileAsynchronously('./unexistingPath');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    fsPromises.readFile = jest.fn().mockResolvedValue(fileText);
    fs.existsSync = jest.fn().mockReturnValue(true);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileText);
  });
});
