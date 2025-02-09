import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TypeAppDispatch, TypeRootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import IRegisterForm from '../../interfaces/RegisterForm.interface';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from '../Login/Login.module.css';

const Register = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch<TypeAppDispatch>(); // хук позволяет устанавливать состояние
   const { jwt, registerErrorMessage } = useSelector((s: TypeRootState) => s.user);

   useEffect(() => {
      if (jwt) {
         navigate('/');
      }
   }, [jwt, navigate]);

   const submit = async (e: FormEvent) => {
      e.preventDefault();

      const target = e.target as typeof e.target & IRegisterForm; // типизация target
      const { email, password, name } = target;
      
      dispatch(userActions.clearRegisterError());
      dispatch(register({ email: email.value, password: password.value, name: name.value }));
   };

   return (
      <div className={styles['login']}>
         <Headling>Регистрация</Headling>
         {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
         <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
               <label htmlFor='email'>Ваш email</label>
               <Input id='email' name='email' type='email' placeholder='Email' />
            </div>
            <div className={styles['field']}>
               <label htmlFor='password'>Пароль</label>
               <Input id='password' name='password' type='password' placeholder='Пароль' />
            </div>
            <div className={styles['field']}>
               <label htmlFor='name'>Как вас зовут?</label>
               <Input id='name' name='name' type='text' placeholder='Ваше имя' />
            </div>
            <Button appearence='big'>Зарегистрироваться</Button>
         </form>
         <div className={styles['footer']}>
            <div>Есть аккаунт?</div>
            <Link to='/auth/login'>Войти</Link>
         </div>
      </div>
   );
};

export default Register;
