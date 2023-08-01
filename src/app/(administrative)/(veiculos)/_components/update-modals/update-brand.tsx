'use client'

import { useState } from "react";
import { components } from "../../../../../styles/tailwind";
import { InputText } from "../../../../../components/forms-components/input-text";
import { useForm } from "../../../../../hooks/useForm";
import { FiX } from "react-icons/fi";
import { useNotification } from "../../../../../hooks/useNotification";
import { useRouter } from "next/navigation";
import { ICity } from "@/types/imoveis";
import { api, apiAdmin } from "@/services/api";
import Loading from "@/app/loading";
import { IBrand } from "@/types/veiculos";



export function ModalUpdateBrand({brand}: {brand: IBrand}) {
    const router = useRouter();
    const notification = useNotification();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const name = useForm('text', brand?.name);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const {success, message} = await apiAdmin.patch(`brands/${brand.id}`, {
                name: name.value,
                type: 'brandcar'
            }).then(res => res.data);
            if(success) {
                notification.execute('success', 'Marca atualizada com sucesso.');
                router.refresh();
                setShow(false);
            } else {
                throw new Error(message);
            }
        } catch (error) {
            notification.execute('danger', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button className={components.button.secondary + ' h-12 text-sm'} onClick={() => setShow(true)}>Editar marca</button>
            {show &&
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] p-3 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="w-full max-w-xl bg-white p-3 rounded-md relative">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <h4 className="font-semibold text-zinc-900 text-lg">Editar marca em carros</h4>
                            </div>
                            <button className={components.button.icon_small} onClick={() => setShow(false)}><FiX /></button>
                        </div>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <InputText
                                id="name"
                                title="Nome da marca*"
                                type="text"
                                {...name}
                            />
                            <div className="flex justify-end gap-2">
                                <button className={components.button.secondary + ' h-12'} onClick={() => setShow(false)}>Cancelar</button>
                                <button className={components.button.primary}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {loading && <Loading />}
        </>
    )
}