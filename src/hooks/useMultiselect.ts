'use client'
import { useEffect, useState } from "react";

export interface OptionSelectProps {
    id?: number | string;
    name: string;
    enum?: string;
    width?: number;
    height?: number;
}

export interface useSelectProps {
    value: OptionSelectProps[],
    onChange: (option: OptionSelectProps) => void,
    label: string,
    enums: string,
    setValue: any,
    setLabel: any,
    setOptions: any,
    options: OptionSelectProps[],
}

export function useMultiselect(data?: OptionSelectProps[], initialValue?: OptionSelectProps[]): useSelectProps {
    const [value, setValue] = useState<OptionSelectProps[]>(initialValue ?? []);
    const [options, setOptions] = useState<OptionSelectProps[]>(data ?? []);
    const [enums, setEnums] = useState('');
    const [label, setLabel] = useState('');

    const onChange = (option: OptionSelectProps) => {
        if (!value.find(item => item.id === option.id)) {
            setValue(old => [...old, options.find(item => item.id === option.id)]);
        } else {
            setValue(old => [...old.filter(item => item.id != option.id)]);
        }
    }

    useEffect(() => {
        if (value) {
            setLabel(value.map((option) => option?.name).join(', '));
            setEnums(value.map((option) => option?.enum).join(','));
        }
    }, [value]);

    return {
        value,
        setValue,
        enums,
        onChange,
        label,
        setLabel,
        setOptions,
        options,
    }
}