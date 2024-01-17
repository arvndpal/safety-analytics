import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiCalls';

// This function deails the api call response , added it see backdrop effct
const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
export const getDealerWiseClaimsData = createAsyncThunk(
  'chart/dealer-wise-claims',
  async () => {
    try {
      const response = await getData('common/chart?name=Dealer-wise Claims');
      // await wait((1 / 2) * 1000);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getModelWiseClaimsData = createAsyncThunk(
  'chart/model-wise-claims',
  async () => {
    try {
      const response = await getData('common/chart?name=Model-wise Claims');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getViolationCategoriesCount = createAsyncThunk(
  'chart/violation-categories-count',
  async () => {
    try {
      const response = await getData(
        'common/chart?name=Violation Categories - Count'
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getViolationTrendData = createAsyncThunk(
  'chart/violation-trends-data',
  async () => {
    try {
      const response = await getData(
        'common/chart?name=Violation trend over years'
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const kpiSlice = createSlice({
  name: 'kpi',
  initialState: {
    dealerWiseClaims: {},
    modelWiseClaims: {},
    violationCategoriesCount: {},
    violationTrendData: {},
    dealerWiseClaimsLoading: false,
    hasError: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDealerWiseClaimsData.pending, (state, action) => {
        state.dealerWiseClaimsLoading = true;
      })
      .addCase(getDealerWiseClaimsData.fulfilled, (state, action) => {
        state.dealerWiseClaimsLoading = false;
        state.dealerWiseClaims = action.payload;
      })
      .addCase(getDealerWiseClaimsData.rejected, (state, action) => {
        state.dealerWiseClaimsLoading = true;
        state.hasError = true;
      })
      //model wise claim
      .addCase(getModelWiseClaimsData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getModelWiseClaimsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modelWiseClaims = action.payload;
      })
      .addCase(getModelWiseClaimsData.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      })
      //violation categries count
      .addCase(getViolationCategoriesCount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getViolationCategoriesCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.violationCategoriesCount = action.payload;
      })
      .addCase(getViolationCategoriesCount.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      })
      //violation trend
      .addCase(getViolationTrendData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getViolationTrendData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.violationTrendData = action.payload;
      })
      .addCase(getViolationTrendData.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});

export default kpiSlice.reducer;
