import { configureStore } from '@reduxjs/toolkit';
import estimatorReducer from './estimatorSlice';
import catalogReducer from './catalogSlice'


export const store = configureStore({
  reducer: {
    estimator: estimatorReducer,
    catalog: catalogReducer,
  },
});