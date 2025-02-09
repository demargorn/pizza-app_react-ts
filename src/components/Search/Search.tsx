import { forwardRef } from 'react';
import cn from 'classnames';
import ISearchProps from './Search.props';
import styles from './Search.module.css';

const Search = forwardRef<HTMLInputElement, ISearchProps>(function Input(
   { isValid = true, className, ...props },
   ref
) {
   return (
      <div className={styles['input-wrapper']}>
         <input
            {...props}
            ref={ref}
            className={cn(styles['input'], className, {
               [styles['invalid']]: !isValid,
            })}
         />
         <img className={styles['search-icon']} src='./search.svg' alt='иконка лупы' />
      </div>
   );
});

export default Search;
