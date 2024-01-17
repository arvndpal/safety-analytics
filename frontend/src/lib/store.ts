import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './features/toggleSlice';
import userReducer from './features/userSlice';
import kpiReducer from './features/kpiSlice';
import chartReducer from './features/chartSlice';
const appStore = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userReducer,
    kpi: kpiReducer,
    chart: chartReducer,
  },
});

export default appStore;
