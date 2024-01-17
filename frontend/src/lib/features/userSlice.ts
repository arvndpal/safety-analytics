import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteData, getData, updateData } from '../../utils/apiCalls';
export const getUserData = createAsyncThunk('user/userList', async () => {
  try {
    const response = await getData('employees');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, thunkAPI) => {
    try {
      await deleteData('employees/' + id);
      thunkAPI.dispatch(getUserData());
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/update',
  async (data, thunkAPI) => {
    const { id, user }: any = data;
    try {
      await updateData('employees/' + id, user);
      thunkAPI.dispatch(getUserData());
    } catch (error) {
      console.error(error);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    isLoading: false,
    hasError: false,
    loggedInUser: {},
  },
  reducers: {
    // getUserList: (state, action) => {
    //   state.userData = action.payload;
    // },
    loggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});

export const { loggedInUser } = userSlice.actions;

export default userSlice.reducer;
