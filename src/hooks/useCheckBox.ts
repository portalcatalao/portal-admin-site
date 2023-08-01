import {useState} from "react";

export interface OptionCheckBoxProps {
    id: number | string;
    name: string;
}

export interface useCheckBoxProps {
    value: OptionCheckBoxProps[];
    options: OptionCheckBoxProps[];
    setOptions: any,
    onChange: (option: OptionCheckBoxProps) => void;
    isActive: (option: OptionCheckBoxProps) => boolean;
}

export function useCheckBox(): useCheckBoxProps {
    const [value, setValue] = useState<OptionCheckBoxProps[]>([]);
    const [options, setOptions] = useState<OptionCheckBoxProps[]>([]);

    const onChange = (option: OptionCheckBoxProps) => {
        {isActive(option) ? setValue(value.filter(item => item.id != option.id)) : setValue([...value, option])}
    }

    const isActive = (option: OptionCheckBoxProps) => {
        return value.find(item => item.id === option.id) ? true : false;
    }

    return {
        value,
        options,
        setOptions,
        onChange,
        isActive
    }
}