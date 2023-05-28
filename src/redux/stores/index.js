import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth.slice';

const reducer = combineReducers({
  auth: authReducer,
});
export default configureStore({
  reducer,
  devTools: true,
});
