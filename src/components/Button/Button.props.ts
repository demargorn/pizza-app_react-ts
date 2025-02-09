import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   appearence?: 'big' | 'small'
}

export default IButtonProps;