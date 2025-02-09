import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TypeAppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import IProductCardProps from './ProductCard.props';
import styles from './ProductCard.module.css';

const ProductCard = (props: IProductCardProps) => {
   const dispatch = useDispatch<TypeAppDispatch>();

   // функция добавления в корзину 
   const add = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(cartActions.add(props.id));
   };

   return (
      <Link to={`/products/${props.id}`} className={styles['link']}>
         <div className={styles['card']}>
            <div className={styles['header']} style={{ backgroundImage: `url(${props.image})` }}>
               <div className={styles['price']}>
                  {props.price}&nbsp;
                  <span className={styles['currency']}>₽</span>
               </div>
               <button className={styles['add-to-cart']} onClick={add}>
                  <img src='./add-to-cart.svg' alt='добавить в корзину' />
               </button>
               <div className={styles['rating']}>
                  {props.rating}&nbsp;
                  <img src='./star.svg' alt='иконка звездочки' />
               </div>
            </div>
            <div className={styles['footer']}>
               <div className={styles['title']}>{props.name}</div>
               <div className={styles['description']}>{props.ingredients}</div>
            </div>
         </div>
      </Link>
   );
};

export default ProductCard;
