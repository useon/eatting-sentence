import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload
    },
  },
});

export const {setUser} = userSlice.actions;
export const selectEmail = (state) => state.user.email;

export default userSlice.reducer;
