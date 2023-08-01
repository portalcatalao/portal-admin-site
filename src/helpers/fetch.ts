import { cookies } from "next/headers";

export const fetchDataImoveis = async (path: string, ttl?: number) => {
    const token = cookies().get('mobilar.token');
    const res = await fetch(process.env.NEXT_PUBLIC_URL_DEFAULT + path, {
        headers: {
            'authorization': token?.value ? `bearer ${token.value}` : null
        },
        next: {
            revalidate: ttl ?? 60 * 60 * 4
        }
    });
    const data = await res.json();

    return data;
}
export const fetchData = async (path: string, ttl?: number) => {
    const token = cookies().get('mobilar_admin.token');
    const res = await fetch(process.env.NEXT_PUBLIC_URL_API + path, {
        headers: {
            'authorization': token?.value ? `bearer ${token.value}` : null
        },
        next: {
            revalidate: ttl ?? 60 * 60 * 24 * 2
        }
    });
    const data = await res.json();

    return data;
}