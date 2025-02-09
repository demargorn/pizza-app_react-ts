import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import IProduct from '../../interfaces/Product.interface';

const Product = () => {
   const data = useLoaderData() as { data: IProduct }; // получаем data посредством хука React.Router

   return (
      <Suspense fallback={'Загружаю...'}>
         <Await resolve={data}>
            {({ data }: { data: IProduct }) => <>Product - {data.name}</>}
         </Await>
      </Suspense>
   );
};

export default Product;
