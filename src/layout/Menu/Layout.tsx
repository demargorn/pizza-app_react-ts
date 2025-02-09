import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { TypeAppDispatch, TypeRootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

const Layout = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch<TypeAppDispatch>();
   const profile = useSelector((s: TypeRootState) => s.user.profile);
   const items = useSelector((s: TypeRootState) => s.cart.items); // сколько находится в корзине

   const logOut = () => {
      dispatch(userActions.logOut());
      navigate('/auth/login');
   };

   useEffect(() => {
      dispatch(getProfile());
   }, [dispatch]);

   return (
      <div className={styles['layout']}>
         <div className={styles['side-bar']}>
            <div className={styles['user']}>
               <img className={styles['avatar']} src='./avatar.svg' alt='аватар пользователя' />
               <div className={styles['name']}>{profile?.name}</div>
               <div className={styles['email']}>{profile?.email}</div>
            </div>
            <div className={styles['menu']}>
               <NavLink
                  to='/'
                  className={({ isActive }) =>
                     cn(styles['link'], {
                        [styles.active]: isActive,
                     })
                  }
               >
                  <img src='./menu.svg' alt='иконка меню' />
                  Меню
               </NavLink>
               <NavLink
                  to='/cart'
                  className={({ isActive }) =>
                     cn(styles['link'], {
                        [styles.active]: isActive,
                     })
                  }
               >
                  <img src='./cart.svg' alt='иконка корзины' />
                  Корзина
                  <span className={styles['item-count']}>
                     {items.reduce((acc, item) => acc + item.count, 0)}
                  </span>
               </NavLink>
            </div>
            <Button className={styles['exit']} onClick={logOut}>
               <img src='./exit.svg' alt='иконка выхода' />
               Выход
            </Button>
         </div>
         <div className={styles['content']}>
            <Outlet />
         </div>
      </div>
   );
};

export default Layout;
