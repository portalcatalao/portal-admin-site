import { useState } from "react";

export interface useBooleanProps {
    state: null | boolean;
    error: string;
    onChange: (value: boolean) => void;
    validate: () => boolean;
}

interface Props {
    initialState?: boolean;
}

export function useBoolean(initialState?: boolean): useBooleanProps {
    const [state, setState] = useState<null | boolean>(initialState ?? null);
    const [error, setError] = useState(null);

    const onChange = (value: boolean) => {
        {error && setError(false)}
        setState(value);
    }

    const validate = () => {
        if(state === null) {
            setError('Selecione um valor para prosseguir');
            return false;
        }
        return true;
    }

    return {
        state,
        error,
        onChange,
        validate
    }
}