import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from '../../utils/apiCalls';
export const getKPIsFirstList = createAsyncThunk('kpi/list', async () => {
  try {
    const response = await getData('common/kpis?labels=1,2,3,4,9,8');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
export const getKPIsSecondList = createAsyncThunk('kpi/list2', async () => {
  try {
    const response = await getData('common/kpis?labels=5,6,7');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const kpiSlice = createSlice({
  name: 'kpi',
  initialState: {
    firstKPIs: [],
    secondKPIs: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    // loggedInUser: (state, action) => {
    //   state.loggedInUser = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getKPIsFirstList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getKPIsFirstList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.firstKPIs = action.payload;
      })
      .addCase(getKPIsFirstList.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      })
      .addCase(getKPIsSecondList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getKPIsSecondList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.secondKPIs = action.payload;
      })
      .addCase(getKPIsSecondList.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});

// export const {  } = userSlice.actions;

export default kpiSlice.reducer;
