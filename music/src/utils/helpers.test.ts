import { describe, it, expect } from '@jest/globals';
import { formatTime, getUniqueValuesByKey } from './helper';

describe('formatTime', () => {
  it('форматирует секунды меньше минуты', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(42)).toBe('0:42');
  });

  it('форматирует ровно минуту', () => {
    expect(formatTime(60)).toBe('1:00');
  });

  it('форматирует минуты и секунды', () => {
    expect(formatTime(125)).toBe('2:05');
    expect(formatTime(3599)).toBe('59:59');
  });
});

describe('getUniqueValuesByKey', () => {
  const tracks: TrackType[] = [
    {
      _id: 1,
      name: 'Song One',
      author: 'Author1',
      album: 'Album1',
      genre: ['rock', 'pop'],
      duration_in_seconds: 120,
      release_date: '2020-01-01',
      logo: null,
      track_file: 'track1.mp3',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Song Two',
      author: 'Author2',
      album: 'Album2',
      genre: ['pop'],
      duration_in_seconds: 150,
      release_date: '2021-01-01',
      logo: null,
      track_file: 'track2.mp3',
      stared_user: [],
    },
    {
      _id: 3,
      name: 'Song Three',
      author: 'Author1',
      album: 'Album3',
      genre: ['jazz'],
      duration_in_seconds: 200,
      release_date: '2022-01-01',
      logo: null,
      track_file: 'track3.mp3',
      stared_user: [],
    },
  ];

  it('возвращает уникальных авторов', () => {
    expect(getUniqueValuesByKey(tracks, 'author')).toEqual([
      'Author1',
      'Author2',
    ]);
  });

  it('возвращает уникальные альбомы', () => {
    expect(getUniqueValuesByKey(tracks, 'album')).toEqual([
      'Album1',
      'Album2',
      'Album3',
    ]);
  });

  it('возвращает уникальные жанры', () => {
    expect(getUniqueValuesByKey(tracks, 'genre')).toEqual([
      'rock',
      'pop',
      'jazz',
    ]);
  });

  it('возвращает пустой массив для пустого списка', () => {
    expect(getUniqueValuesByKey([], 'author')).toEqual([]);
  });
});
