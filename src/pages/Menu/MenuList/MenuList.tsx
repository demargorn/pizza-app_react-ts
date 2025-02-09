import ProductCard from '../../../components/ProductCard/ProductCard';
import IMenuListProps from './MenuList.props';
import styles from './MenuList.module.css';

const MenuList = ({ products }: IMenuListProps) => {
   return (
      <div className={styles['wrapper']}>
         {products.map((product) => (
            <ProductCard
               key={product.id}
               id={product.id}
               name={product.name}
               price={product.price}
               ingredients={product.ingredients.join(', ')}
               image={product.image}
               rating={product.rating}
            />
         ))}
      </div>
   );
};

export default MenuList;
