import path from 'path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 1000;

    doStuffByTimeout(callback, time);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
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
    const callback = jest.fn();
    const time = 1000;

    doStuffByInterval(callback, time);

    jest.advanceTimersByTime(time);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const time = 1000;

    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time * 3);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const filePath = 'example.txt';
    await readFileAsynchronously(filePath);
    expect(join).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const filePath = 'exmaple2.txt';
    await readFileAsynchronously(filePath);
    expect(await readFileAsynchronously(filePath)).toBe(null);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.fn().mockImplementation(readFileAsynchronously);
    const pathToFile = '12345.txt';

    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValue(
        new Promise((resolve) =>
          resolve(Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])),
        ),
      );
    jest.fn().mockImplementation(readFileAsynchronously);

    const filePath = 'example3.txt';
    expect(await readFileAsynchronously(filePath)).toBe(
      Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]).toString(),
    );
  });
});
