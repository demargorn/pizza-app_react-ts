import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TypeAppDispatch, TypeRootState } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { PREFIX } from '../../helpers/API';
import IProduct from '../../interfaces/Product.interface';
import Headling from '../../components/Headling/Headling';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import styles from './Cart.module.css';

const DELIVERY = 169;

const Cart = () => {
   const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
   const navigate = useNavigate();
   const dispatch = useDispatch<TypeAppDispatch>();
   const items = useSelector((s: TypeRootState) => s.cart.items);
   const jwt = useSelector((s: TypeRootState) => s.user.jwt);
   const total = items
      .map((i) => {
         const product = cartProducts.find((p) => p.id === i.id);
         if (!product) {
            return 0;
         }
         return i.count * product.price;
      })
      .reduce((acc, item) => (acc += item), 0);

   const getItem = async (id: number) => {
      const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
      return data;
   };

   const loadAllItems = async () => {
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCartProducts(res);
   };

   const checkout = async () => {
      await axios.post(
         `${PREFIX}/order`,
         {
            products: items,
         },
         {
            headers: {
               Authorization: `Bearer ${jwt}`,
            },
         }
      );
      dispatch(cartActions.clean());
      navigate('/success');
   };

   useEffect(() => {
      loadAllItems();
   }, [items]);

   return (
      <>
         <Headling className={styles['headling']}>Корзина</Headling>
         {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
               return;
            }
            return <CartItem key={product.id} count={i.count} {...product} />;
         })}
         <div className={styles['line']}>
            <div className={styles['text']}>Итог:</div>
            <div className={styles['price']}>
               {total}
               &nbsp;<span>₽</span>
            </div>
         </div>
         <hr className={styles['hr']} />
         <div className={styles['line']}>
            <div className={styles['text']}>Доставка:</div>
            <div className={styles['price']}>
               {DELIVERY}
               &nbsp;<span>₽</span>
            </div>
         </div>

         <hr className={styles['hr']} />
         <div className={styles['line']}>
            <div className={styles['text']}>Наименований: </div>
            <div className={styles['price']}>{items.length}</div>
         </div>
         <hr className={styles['hr']} />
         <div className={styles['line']}>
            <div className={styles['text']}>Сумма:</div>
            <div className={styles['price']}>
               {total + DELIVERY}
               &nbsp;<span>₽</span>
            </div>
         </div>
         <div className={styles['button']}>
            <Button appearence='big' onClick={checkout}>
               Оформить
            </Button>
         </div>
      </>
   );
};

export default Cart;
