import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TypeAppDispatch, TypeRootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import ILoginForm from '../../interfaces/LoginForm.interface';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch<TypeAppDispatch>(); // хук позволяет устанавливать состояние
   const { jwt, loginErrorMessage } = useSelector((s: TypeRootState) => s.user);

   useEffect(() => {
      if (jwt) {
         navigate('/');
      }
   }, [jwt, navigate]);

   const submit = async (e: FormEvent) => {
      e.preventDefault();
      dispatch(userActions.clearLoginError());
      const target = e.target as typeof e.target & ILoginForm; // типизация target
      const { email, password } = target;
      await sendLogin(email.value, password.value);
   };

   const sendLogin = async (email: string, password: string) => {
      dispatch(login({ email, password }));
   };

   return (
      <div className={styles['login']}>
         <Headling>Вход</Headling>
         {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
         <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
               <label htmlFor='email'>Ваш email</label>
               <Input id='email' name='email' type='email' placeholder='Email' />
            </div>
            <div className={styles['field']}>
               <label htmlFor='password'>Пароль</label>
               <Input id='password' name='password' type='password' placeholder='Пароль' />
            </div>
            <Button appearence='big'>Вход</Button>
         </form>
         <div className={styles['footer']}>
            <div>Нет аккаунта?</div>
            <Link to='/auth/register'>Зарегистрироваться</Link>
         </div>
      </div>
   );
};

export default Login;
