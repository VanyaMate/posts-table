import { useState } from 'react';


export interface UseInputData {
    value: string;
    setValue: (v: string) => void;
    onChange?: (() => void);
}

export interface UseInputOptions {
    defaultValue?: string;
    onChange?: () => void;
}

export const useInput = function (options: UseInputOptions): UseInputData {
    const [ value, setValue ] = useState<string>(options.defaultValue ?? '');

    return {
        value, setValue, onChange: options.onChange
    };
};