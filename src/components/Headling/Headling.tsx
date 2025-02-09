import cn from 'classnames';
import IHeadlingProps from './Headling.props.ts';
import styles from './Headling.module.css';

const Headling = ({ children, className, ...props }: IHeadlingProps) => {
   return (
      <h1 className={cn(className, styles['headling'])} {...props}>
         {children}
      </h1>
   );
};

export default Headling;
