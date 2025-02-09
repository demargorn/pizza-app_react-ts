import { lazy, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store/store.ts';
import { PREFIX } from './helpers/API.ts';
import RequireAuth from './helpers/RequireAuth.tsx';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Layout from './layout/Menu/Layout.tsx';
import Cart from './pages/Cart/Cart';
import ErrorPage from './pages/Error/Error';
import Product from './pages/Product/Product.tsx';
import Login from './pages/Login/Login.tsx';
import Success from './pages/Success/Success.tsx';
import Register from './pages/Register/Register.tsx';
import './index.css';

const Menu = lazy(() => import('./pages/Menu/Menu')); // ленивая загрузка

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <RequireAuth>
            <Layout />
         </RequireAuth>
      ),
      children: [
         {
            path: '/pizza-app_react-ts',
            element: (
               <Suspense fallback={<>Загрузка...</>}>
                  <Menu />
               </Suspense>
            ),
         },
         {
            path: '/cart', // путь
            element: <Cart />, // компонент
         },
         {
            path: '/success',
            element: <Success />,
         },
         {
            path: '/products/:id',
            element: <Product />,
            errorElement: <>Ошибка</>, // будет показан компонент в случае ошибки в loader
            // функция говорит как загрузить компонент (id === params.id)
            loader: async ({ params }) => {
               try {
                  // выполняем запрос к API для получения данных о продукте
                  const response = await axios.get(`${PREFIX}/products/${params.id}`);
                  return { data: response.data }; // возвращаем данные напрямую
               } catch (error) {
                  throw new Error('Ошибка при загрузке продукта'); // обрабатываем ошибку
               }
            },
         },
      ],
   },
   {
      path: '/auth',
      element: <AuthLayout />,
      children: [
         {
            path: 'login', // путь без слэша
            element: <Login />,
         },
         {
            path: 'register', // путь без слэша
            element: <Register />,
         },
      ],
   },
   {
      path: '*', // все остальные пути
      element: <ErrorPage />,
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </StrictMode>
);
