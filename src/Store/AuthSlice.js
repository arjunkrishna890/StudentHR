import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    data:null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    removeToken:(state,action)=>{
        state.token = null;
        localStorage.removeItem('token'); 
    },
    setData: (state, action) => {
      state.data = action.payload
    },
  },
});

export const { setToken ,removeToken,setData} = authSlice.actions;
export default authSlice.reducer;
