import userService from '@/services/user.service';
import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut } from '../thunks/user.thunk';
import authService from '@/services/auth.service';

const user = authService.getLocalUser();
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    isLoggedIn: user ? true : false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(signIn.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        user: payload.user,
        isLoggedIn: true
      }))
      .addCase(signIn.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(signOut.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(signOut.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        user: null,
        isLoggedIn: false,
        error: null,
      }))
      .addCase(signOut.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        user: null,
        isLoggedIn: false,
        error: payload,
      }));
  },
});

export const {} = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
