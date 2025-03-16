import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import IProduct from '../../interfaces/Product.interface';
import MenuList from './MenuList/MenuList';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

const Menu = () => {
   const [products, setProducts] = useState<IProduct[]>([]); // состояние списка продуктов
   const [isLoading, setIsLoading] = useState<boolean>(false); // состояние загрузки
   const [error, setError] = useState<string | undefined>(); // состояние ошибки загрузки
   const [filter, setFilter] = useState<string>(); // состояние строки поиска

   // async fn загрузки списка продуктов
   const getMenu = async (name?: string) => {
      try {
         setIsLoading(true); // начинаем загрузку
         const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
            params: {
               name,
            },
         });
         setProducts(data);
         setIsLoading(false); // прекращаем загрузку
      } catch (error) {
         if (error instanceof AxiosError) {
            setError(error.message);
         }
         setIsLoading(false); // в случае ошибки прекращаем загрузку
         return;
      }
   };

   const updateFilter = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
   
   useEffect(() => {
      getMenu(filter);
   }, []);

   return (
      <>
         <div className={styles['head']}>
            <Headling>Меню</Headling>
            <Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
         </div>
         <div>
            {/* показываем сообщение об ошибке в случае ошибки из axios */}
            {error && <>{error}</>}
            {/* показываем список продуктов после загрузки */}
            {!isLoading && products.length > 0 && <MenuList products={products} />}
            {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
            {/* показываем заголовок загрузки продуктов */}
            {isLoading && <>Загружаем список продуктов...</>}
         </div>
      </>
   );
};

export default Menu;
