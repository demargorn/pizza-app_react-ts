import { InputHTMLAttributes } from 'react';

interface ISearchProps extends InputHTMLAttributes<HTMLInputElement> {
   isValid?: boolean;
}

export default ISearchProps;
