'use client'

import { InputText } from "@/components/forms-components/input-text";
import { LoadingSvg } from "@/components/loading-svg";
import { useForm } from "@/hooks/useForm";
import { apiAdmin } from "@/services/api";
import { components } from "@/styles/tailwind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const email = useForm('email');
    const password = useForm('password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            {error && setError(false)}

            const { access_token, user } = await apiAdmin.post('auth/login', {email: email.value, password: password.value}).then(res => res.data);

            if(!access_token || !user) {
                setError(true);
            } else {
                setCookie(undefined, 'mobilar_admin.token', access_token, { maxAge: 2 * 24 * 60 * 60, path: '/', })
                setCookie(undefined, 'mobilar_admin.user', JSON.stringify(user), { maxAge: 2 * 24 * 60 * 60, path: '/', });
                router.push('/painel');
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <Image src={'/mobilar-cl.svg'} alt="" width={168} height={30} />
            <form className="max-w-lg w-full flex flex-col gap-4 mt-10 mb-8" onSubmit={handleSubmit}>
                <InputText
                    id="email"
                    placeholder="Entre com seu email"
                    title="Email"
                    type="email"
                    {...email}
                />
                <InputText
                    id="password"
                    placeholder="Entre com sua senha"
                    title="Senha"
                    type="password"
                    {...password}
                />
                {error && <span className={components.alerts.red}>Senha ou email incorretos!</span>}
                <div className="flex justify-end">
                    <Link href={'/recuperar-senha'} className="text-sm font-medium">Esqueceu sua senha?</Link>
                </div>
                <button disabled={loading} className={components.button.primary}>
                    {loading ? 'Carregando' : 'Entrar'}
                    <LoadingSvg show={loading} color="#fff" />
                </button>
            </form>
        </div>
    )
}