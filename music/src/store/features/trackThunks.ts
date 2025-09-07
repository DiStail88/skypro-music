// src/store/features/trackThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';

export const fetchFavoriteTracks = createAsyncThunk<
  TrackType[],
  string,
  { rejectValue: string }
>('tracks/fetchFavoriteTracks', async (token, { rejectWithValue }) => {
  try {
    const data = await getFavoriteTracks(token);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue('Неизвестная ошибка');
  }
});
