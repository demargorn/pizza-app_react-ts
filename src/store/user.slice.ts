import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { loadState } from './storage';
import { TypeRootState } from './store';
import IUserPersistentState from '../interfaces/UserPersistentState';
import IProfile from '../interfaces/user.interface';
import IUserState from '../interfaces/UserState.interface';
import ILoginResponce from '../interfaces/Auth.interface';

const JWT_PERSISTENT_STATE = 'userData';

const initialState: IUserState = {
   jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null, // загружаем при загрузке из local storage
};

const login = createAsyncThunk(
   'user/login',
   async (params: { email: string; password: string }) => {
      try {
         const { data } = await axios.post<ILoginResponce>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password,
         });
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
         }
      }
   }
);

const register = createAsyncThunk(
   'user/register',
   async (params: { email: string; password: string; name: string }) => {
      try {
         const { data } = await axios.post<ILoginResponce>(`${PREFIX}/auth/register`, {
            email: params.email,
            password: params.password,
            name: params.name,
         });
         return data;
      } catch (error) {
         if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message);
         }
      }
   }
);

const getProfile = createAsyncThunk<IProfile, void, { state: TypeRootState }>(
   'user/getProfile',
   async (_, thunkApi) => {
      const jwt = thunkApi.getState().user.jwt;
      const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
      return data;
   }
);

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: (state) => {
         state.jwt = null;
      },
      clearLoginError: (state) => {
         state.loginErrorMessage = undefined;
      },
      clearRegisterError: (state) => {
         state.registerErrorMessage = undefined;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.jwt = action.payload.access_token;
      });
      builder.addCase(login.rejected, (state, action) => {
         state.loginErrorMessage = action.error.message;
      });

      builder.addCase(register.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.jwt = action.payload.access_token;
      });
      builder.addCase(register.rejected, (state, action) => {
         state.registerErrorMessage = action.error.message;
      });

      builder.addCase(getProfile.fulfilled, (state, action) => {
         state.profile = action.payload;
      });
   },
});

const userActions = userSlice.actions; // для изменения состояния

export { login, register, getProfile, userActions, JWT_PERSISTENT_STATE };
export default userSlice.reducer;
