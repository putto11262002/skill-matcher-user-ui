import { createSlice } from '@reduxjs/toolkit';
import authService from '@/services/auth.service';
import { signUp, signIn, signOut } from '../thunks/user.thunk';

const user = authService.getLocalUser();
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    isLoggedIn: user ? true : false,
    loading: false,
    error: null,
  },
  reducers: {
    updateUser: (state, action) => ({
      ...state,
      user: action.payload
    }),
    clearAuth: (state, action) => ({
      ...state,
      user: undefined,
      isLoggedIn: false,
      loading: false,
      error: null
    })
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(signUp.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        user: payload.user,
      }))
      .addCase(signUp.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
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
      }))
    
      ;
  },
});

export const {updateUser, clearAuth} = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
