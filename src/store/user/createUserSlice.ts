import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {setValue, getValue, deleteValue} from '../../utils/asyncStorage';

// Storage key constant
const USER_STORAGE_KEY = '@user_data';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk to load user from async storage
export const loadUserFromStorage = createAsyncThunk(
  'user/loadFromStorage',
  async (_, {rejectWithValue}) => {
    const userData = await getValue<User>(USER_STORAGE_KEY);
    if (userData) {
      return userData;
    }
    return rejectWithValue('Failed to load user data from storage');
  },
);

// Async thunk to save user to async storage
export const saveUserToStorage = createAsyncThunk(
  'user/saveToStorage',
  async (userData: User, {rejectWithValue}) => {
    console.log('userData', userData);
    const success = await setValue(USER_STORAGE_KEY, userData);
    if (success) {
      return userData;
    }
    return rejectWithValue('Failed to save user data to storage');
  },
);

// Async thunk to delete user from async storage
export const deleteUserFromStorage = createAsyncThunk(
  'user/deleteFromStorage',
  async (_, {rejectWithValue}) => {
    const success = await deleteValue(USER_STORAGE_KEY);
    if (success) {
      return true;
    }
    return rejectWithValue('Failed to delete user data from storage');
  },
);

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous action to set user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Synchronous action to clear user
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // Update user fields
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
    // Clear error
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Load user from storage
    builder
      .addCase(loadUserFromStorage.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Save user to storage
    builder
      .addCase(saveUserToStorage.pending, state => {
        state.isLoading = true;
      })
      .addCase(saveUserToStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(saveUserToStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete user from storage
    builder
      .addCase(deleteUserFromStorage.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteUserFromStorage.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(deleteUserFromStorage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {setUser, clearUser, updateUser, clearError} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
