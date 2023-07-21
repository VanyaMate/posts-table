import React from 'react';
import Input, { InputProps } from '../input/input.tsx';
import css from './input-with-icon.module.scss';


interface InputWithIconProps extends InputProps {
    icon: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
    icon,
    hook,
    className,
    ...other
}) => {
    return (
        <div className={ css.container }>
            <Input hook={ hook } { ...other }/>
            <img className={ css.icon } src={ icon } alt={ 'search-icon' }/>
        </div>
    );
};

export default InputWithIcon;