import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  location: string;
}

const initialState: LocationState = {
 location: "",
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    
  },
});

export const selectLocation = createSelector(
  (state: { location: LocationState }) => state.location,
  (locationState) => locationState.location
);

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;
