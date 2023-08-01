import {useState} from "react";

export interface OptionSelectProps {
    id?: number | string;
    name: string;
    enum?: string;
    width?: number;
    height?: number;
    brand?: string;
    model?: string;
    versionModel?: string;
}

export interface useSelectProps {
    value: OptionSelectProps;
    error: string;
    options: OptionSelectProps[];
    setOptions: any,
    onChange: (option: OptionSelectProps) => void;
    isActive: () => OptionSelectProps;
    clear: () => void;
    validate: () => boolean;
    setError: (value: any) => void;
}

export function useSelect(data?: OptionSelectProps[], initialValue?: OptionSelectProps): useSelectProps {
    const [value, setValue] = useState<OptionSelectProps>(initialValue ?? null);
    const [options, setOptions] = useState<OptionSelectProps[]>(data ?? []);
    const [error, setError] = useState(null);

    const onChange = (option: OptionSelectProps) => {
        {error && setError(null)}
        setValue(option);
    }

    const clear = () => setValue(null);

    const isActive = () => {
        return options.find(item => item.id === value.id);
    }

    const validate = () => {
        if(!value) {
            setError('Selecione um valor');
            return false;
        }
        return true;
    }

    return {
        value,
        options,
        error,
        setError,
        setOptions,
        onChange,
        clear,
        isActive,
        validate
    }
}