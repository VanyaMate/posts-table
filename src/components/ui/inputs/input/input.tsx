import React from 'react';
import { UseInputData } from '../../../../hooks/use-input.hook.ts';
import css from './input.module.scss';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hook: UseInputData;
}

const Input: React.FC<InputProps> = ({
    hook,
    ...other
}) => {
    const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
        hook.setValue(e.target.value);
        hook.onChange && hook.onChange();
    }
    return (
        <input
            {...other}
            value={hook.value}
            onChange={onChangeHandler}
            className={css.container}
        />
    );
};

export default Input;