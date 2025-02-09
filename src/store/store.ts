import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storage';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';

// создаем хранилище
const store = configureStore({
   reducer: {
      user: userSlice,
      cart: cartSlice,
   },
});

// при изменении состояния берем токен и записываем его в JWT_PERSISTENT_STATE
store.subscribe(() => {
   saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
   saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;

export default store;
