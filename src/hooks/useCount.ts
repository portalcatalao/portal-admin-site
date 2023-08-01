import { useState } from "react";

interface Props {
    min: number;
    max: number;
    initialValue?: number;
}

export interface useCountProps {
    value: number,
    setValue: any,
    add: () => void,
    remove: () => void
}

export function useCount({ min, max, initialValue }: Props):  useCountProps{
    const [value, setValue] = useState<number>(initialValue ?? min);

    const add = () => value < max ? setValue(value + 1) : null;
    const remove = () => value > min ? setValue(value - 1) : null;

    return {
        value,
        setValue,
        add,
        remove
    }
}