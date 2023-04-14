import authService from '@/services/auth.service';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await authService.signIn(email, password)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const signOut = createAsyncThunk('auth/sign-out', async ({}, { rejectWithValue }) => {
  try {
    return authService.signOut();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const signUp = createAsyncThunk(
  'auth/sign-up',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await authService.signUp(name, email, password);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
