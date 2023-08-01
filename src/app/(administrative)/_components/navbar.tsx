'use client'

import { components } from "../../../styles/tailwind";
import Image from "next/image";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { destroyCookie } from 'nookies';
import { usePathname, useRouter } from "next/navigation";
import { getImageUrl } from "../../../helpers/image";
import { Aside } from "./aside";
import { useState, useEffect } from "react";

export interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface Props {
    user?: IUser;
}

const excludepaths = ['/imobiliarias/relatorios/resumo'];

export function Navbar({ user }: Props) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value != '') {
            router.push(`/imobiliarias/propriedades?input=${value}`);
        } else {
            router.push(`/imobiliarias/propriedades`);
        }
        router.refresh();
    }

    const pathname = usePathname();
    if (excludepaths.includes(pathname)) return null;


    return (
        <>
            <nav className="fixed lg:sticky w-full top-0 z-50 h-16 border-b shadow-sm flex items-center justify-between px-4 bg-white">
                <Image src={'/mobilar.svg'} alt="Mobilar" width={100} height={30} className="lg:hidden" />
                <button className="lg:hidden" onClick={() => setShow(true)}><FiMenu size={32} /></button>
                {show &&
                    <div className="fixed top-0 bottom-0 left-0 right-0 z-[9999] bg-black bg-opacity-70 lg:hidden" onMouseUp={() => setShow(false)}>
                        <Aside />
                        <button
                            className={components.button.icon_small + ' absolute top-4 left-60'}
                            onClick={() => setShow(false)}>
                            <FiX />
                        </button>
                    </div>
                }
                <form
                    className="hidden lg:flex items-center gap-3"
                    onSubmit={handleSubmit}>
                    <FiSearch />
                    <input
                        className="text-sm border-0 outline-none h-10 placeholder:text-zinc-500 w-80"
                        placeholder="Busque pelo código, cidade, bairro ou rua"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </form>
                <div className="hidden lg:flex items-center gap-3">
                    {user &&
                        <>
                            <div className={`h-10 w-10 overflow-hidden rounded-full relative flex items-center justify-center ${!user.avatar && 'border font-semibold'}`}>
                                {user.avatar ? <Image src={getImageUrl(user.avatar)} alt="" width={40} height={40} /> : user.name.substring(0, 1)}
                            </div>
                            <button className="hidden lg:flex gap-1 items-center text-sm font-medium">{user.name}{/* <FiChevronDown /> */}</button>
                        </>
                    }
                    <button className={components.button.secondary + ' hover:bg-red-500 hover:text-white'} onClick={() => {
                        destroyCookie(null, 'mobilar.user', { path: '/' });
                        destroyCookie(null, 'mobilar.token', { path: '/' });
                        router.push('/login');
                    }}>Sair</button>
                </div>
            </nav>
            <div className="pb-16 lg:pb-0"></div>
        </>
    )
}