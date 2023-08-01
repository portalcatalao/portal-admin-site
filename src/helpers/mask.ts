import VMasker from "vanilla-masker";

export const maskPhone = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 10) {
        value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    return value;
}
export const maskUserName = (value: string) => {
    value = value.replace(' ', '');
    value = value.replace(/[}{,.^@#$%&>\(\)\[\];:'"!?~=+\-_\/*\-+.\|]/g, "");
    return value;
}

export const maskNumberCard = (value: string) => VMasker.toPattern(value, "9999 9999 9999 9999");

export const maskCep = (value: string) => VMasker.toPattern(value, "99999-999");

export const maskCode = (value: string) => VMasker.toPattern(value, "9999-9");

export const maskYear = (value: string) => VMasker.toPattern(value, "9999");

export const maskCpf = (value: string) => VMasker.toPattern(value, "999.999.999-99");

export const maskCnpj = (value: string) => VMasker.toPattern(value, "99.999.999/9999-99");

export const maskPrice = (value: string) => VMasker.toMoney(value);

export const maskNumber = (value: string) => value?.toString().replace(/[^0-9.,]/g, '');