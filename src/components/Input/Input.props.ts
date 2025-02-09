import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
   isValid?: boolean;
}

export default IInputProps;
