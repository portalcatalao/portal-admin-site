import { useState } from "react";
import { maskCep, maskNumberCard, maskPhone, maskUserName, maskCpf, maskPrice, maskNumber, maskCnpj, maskCode, maskYear } from "../helpers/mask";

const types = {
    phone: {
        regex: /^\(\d{2}\) \d{4,5}-?\d{4}$/,
        mask: maskPhone,
        message: 'Número inválido'
    },
    userName: {
        regex: /^\w{3,20}$/,
        mask: maskUserName,
        message: 'Nome de usuário inválido'
    },
    facebook: {
        regex: /^https:\/\/www.facebook.com\/\w{3,15}/,
        message: 'Perfil do facebook inválido'
    },
    instagram: {
        regex: /^@\w{3,15}$/,
        message: 'Perfil do instagram inválido'
    },
    numberCard: {
        regex: /^$/,
        mask: maskNumberCard,
        message: 'Número do cartão inválido'
    },
    cep: {
        regex: /^/,
        mask: maskCep,
        message: 'Cep inválido'
    },
    cpf: {
        regex: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
        mask: maskCpf,
        message: 'CPF inválido'
    },
    cnpj: {
        regex: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
        mask: maskCnpj,
        message: 'CPF inválido'
    },
    price: {
        regex: /^/,
        mask: maskPrice,
        message: 'Preço inválido'
    },
    number: {
        regex: /^/,
        mask: maskNumber,
        message: 'Valor inválido'
    },
    code: {
        regex: /^[0-9]{4}-[0-9]{1}/,
        mask: maskCode,
        message: 'Valor inválido'
    },
    year: {
        regex: /^[0-9]{4}/,
        mask: maskYear,
        message: 'Valor inválido'
    },
    link: {
        regex: /^\/\w*(\/\w*)*/,
        message: 'Link inválido'
    }
}

export interface useFormProps {
    value: string,
    error: string | null,
    setError: any,
    setValue: any,
    onChange: (e) => void,
    onBlur: () => void,
    validate: () => boolean
}

export function useForm(type?: string, initialValue?: string): useFormProps {
    const [value, setValue] = useState(initialValue ?? '');
    const [error, setError] = useState<string | null>(null);

    function validate(value: string) {
        if (!value && value.length === 0) {
            setError('Preencha um valor');
            return false;
        } else {
            if (types[type] && !types[type].regex.test(value)) {
                setError(types[type].message);
                return false;
            } else {
                setError(null);
                return true;
            }
        }
    }

    function onChange({ target }) {
        if (error) validate(target.value);
        {error && setError(null)}
        if (types[type] && types[type].mask) {
            setValue(types[type].mask(target.value));
        } else {
            setValue(target.value);
        }
    }

    return {
        value,
        error,
        setError,
        setValue,
        onChange,
        onBlur: () => validate(value),
        validate: () => validate(value)
    }
}