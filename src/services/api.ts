import axios from "axios";
import { parseCookies } from "nookies";

export function getApi(ctx?: any) {
    const { 'mobilar.token': token } = parseCookies(ctx);
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL_DEFAULT
    })
    if (token) api.defaults.headers['Authorization'] = `Bearer ${token}`;
    return api;
}
export const api = getApi();

export function getApiAdmin(ctx?: any) {
    const { 'mobilar_admin.token': token } = parseCookies(ctx);
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_URL_API
    })
    if (token) api.defaults.headers['Authorization'] = `Bearer ${token}`;
    return api;
}
export const apiAdmin = getApiAdmin();