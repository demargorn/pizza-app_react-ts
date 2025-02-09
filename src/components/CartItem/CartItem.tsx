import { useDispatch } from 'react-redux';
import { TypeAppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import ICartItemProps from './CartItem.props';
import styles from './CartItem.module.css';

const CartItem = (props: ICartItemProps) => {
   const dispatch = useDispatch<TypeAppDispatch>();

   // функция увеличения количества в корзине
   const increase = () => {
      dispatch(cartActions.add(props.id));
   };

   // функция уменьшения количества в корзине
   const decrease = () => {
      dispatch(cartActions.remove(props.id));
   };

   // функция удаления элемента из корзины
   const remove = () => {
      dispatch(cartActions.delete(props.id));
   };

   return (
      <div className={styles['item']}>
         <div className={styles['image']} style={{ backgroundImage: `url(${props.image})` }}></div>
         <div className={styles['description']}>
            <div className={styles['name']}>{props.name}</div>
            <div className={styles['price']}>{props.price}&nbsp;₽</div>
         </div>
         <div className={styles['actions']}>
            <button className={styles['button']} onClick={decrease}>
               <img src='./minus.svg' alt='удалить из корзины' />
            </button>
            <div className={styles['number']}>{props.count}</div>
            <button className={styles['button']} onClick={increase}>
               <img src='./plus.svg' alt='добавить в корзину' />
            </button>
            <button className={styles['remove']} onClick={remove}>
               <img src='./delete.svg' alt='удалить элемент' />
            </button>
         </div>
      </div>
   );
};

export default CartItem;
