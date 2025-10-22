import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteTracks } from './trackThunks';

type initialStateType = {
  tracks: TrackType[];
  currentTrack: TrackType | null;
  isPlay: boolean;
  favoriteTracks: TrackType[];
};

const initialState: initialStateType = {
  tracks: [],
  currentTrack: null,
  isPlay: false,
  favoriteTracks: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.isPlay = true;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    togglePlay: (state) => {
      state.isPlay = !state.isPlay;
    },
    nextTrack: (
      state,
      action: PayloadAction<{ shuffle?: boolean } | undefined>,
    ) => {
      if (!state.currentTrack) return;

      const shuffle = action?.payload?.shuffle || false;

      if (shuffle && state.tracks.length > 1) {
        let randomIndex = Math.floor(Math.random() * state.tracks.length);
        while (state.tracks[randomIndex]._id === state.currentTrack._id) {
          randomIndex = Math.floor(Math.random() * state.tracks.length);
        }
        state.currentTrack = state.tracks[randomIndex];
      } else {
        const index = state.tracks.findIndex(
          (t) => t._id === state.currentTrack!._id,
        );
        state.currentTrack = state.tracks[(index + 1) % state.tracks.length];
      }

      state.isPlay = true;
    },

    prevTrack: (
      state,
      action: PayloadAction<{ shuffle?: boolean } | undefined>,
    ) => {
      if (!state.currentTrack) return;

      const shuffle = action?.payload?.shuffle || false;

      if (shuffle && state.tracks.length > 1) {
        let randomIndex = Math.floor(Math.random() * state.tracks.length);
        while (state.tracks[randomIndex]._id === state.currentTrack._id) {
          randomIndex = Math.floor(Math.random() * state.tracks.length);
        }
        state.currentTrack = state.tracks[randomIndex];
      } else {
        const index = state.tracks.findIndex(
          (t) => t._id === state.currentTrack!._id,
        );
        const prevIndex =
          (index - 1 + state.tracks.length) % state.tracks.length;
        state.currentTrack = state.tracks[prevIndex];
      }

      state.isPlay = true;
    },

    // ❤️ Лайки
    addLikedTrack: (state, action: PayloadAction<TrackType>) => {
      if (!state.favoriteTracks.some((t) => t._id === action.payload._id)) {
        state.favoriteTracks.push(action.payload);
      }
    },
    removeLikedTrack: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t._id !== action.payload._id,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteTracks.fulfilled, (state, action) => {
      state.favoriteTracks = action.payload;
    });
  },
});

export const {
  setTracks,
  setCurrentTrack,
  setIsPlay,
  togglePlay,
  nextTrack,
  prevTrack,
  addLikedTrack,
  removeLikedTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
