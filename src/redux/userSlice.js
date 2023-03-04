import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name:'userSlice',
  initialState:{value:''},
  reducers:{
    login:(state, action) => {
      state.value = action.payload
    }
  }
});

export default userSlice;
export const {login} = userSlice.actions;