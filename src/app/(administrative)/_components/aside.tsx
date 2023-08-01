'use client'

import { components } from "../../../styles/tailwind";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiGrid, FiArrowRight, FiUser, FiMapPin } from "react-icons/fi";
import { LiaMotorcycleSolid } from "react-icons/lia";
import { AiOutlineCar } from "react-icons/ai";
import { BsCodeSquare } from "react-icons/bs";
import { IUser } from "../../../types/imoveis";

const excludepaths = ['/imobiliarias/relatorios/resumo'];

interface Props {
    user?: IUser;
}

export function Aside({ user }: Props) {
    const pathname = usePathname();
    if (excludepaths.includes(pathname)) return null;

    return (
        <aside className="w-72 h-screen bg-gray-900 sticky top-0 overflow-y-auto">
            <div className="h-16 w-full flex items-center justify-center px-4 border-b border-[#24272a] mb-3">
                <Link className="flex" href={'/'}>
                    <Image src={'/redemobilar.svg'} alt="" width={170} height={28} />
                </Link>
            </div>
            <ul className="px-4 mb-4 flex flex-col gap-2">
                <Link
                    href={'/painel'}
                    className={pathname === '/painel' ? components.links.active : components.links.default}
                >
                    <FiGrid />Painel
                </Link>
            </ul>
            <span className="px-8 text-xs text-gray-600">Maps</span>
            <ul className="px-4 mb-4 mt-2 flex flex-col gap-2">
                <Link
                    href={'/cidades'}
                    className={pathname.startsWith('/cidades') ? components.links.active : components.links.default}
                >
                    <FiMapPin />Cidades
                </Link>
            </ul>
            <span className="px-8 text-xs text-gray-600">Veículos</span>
            <ul className="px-4 mb-4 mt-2 flex flex-col gap-2">
                <Link
                    href={'/carros'}
                    className={pathname.startsWith('/carros') ? components.links.active : components.links.default}
                >
                    <AiOutlineCar />Carros
                </Link>
                <Link
                    href={'/motos'}
                    className={pathname.startsWith('/motos') ? components.links.active : components.links.default}
                >
                    <LiaMotorcycleSolid />Motos
                </Link>
                <Link
                    href={'/fipe'}
                    className={pathname.startsWith('/fipe') ? components.links.active : components.links.default}
                >
                    <BsCodeSquare />Fipe
                </Link>
            </ul>
            <span className="px-8 text-xs text-gray-600">Imoveis</span>
            <ul className="px-4 mb-4 mt-2 flex flex-col gap-2">
                <Link
                    href={'/minha-conta'}
                    className={pathname.startsWith('/minha-conta') ? components.links.active : components.links.default}
                >
                    <FiUser />Minha conta
                </Link>
            </ul>
        </aside>
    )
}