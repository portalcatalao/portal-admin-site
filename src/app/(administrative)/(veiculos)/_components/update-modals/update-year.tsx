'use client'

import { useState } from "react";
import { components } from "../../../../../styles/tailwind";
import { InputText } from "../../../../../components/forms-components/input-text";
import { useForm } from "../../../../../hooks/useForm";
import { FiEdit, FiX } from "react-icons/fi";
import { useNotification } from "../../../../../hooks/useNotification";
import { useRouter } from "next/navigation";
import { ICity } from "@/types/imoveis";
import { api, apiAdmin } from "@/services/api";
import Loading from "@/app/loading";
import { InputPrice } from "@/components/forms-components/input-price";
import { IVersionModel, IYearVersionModel } from "@/types/veiculos";
import { maskPrice } from "@/helpers/mask";



export function ModalUpadateYear({ version, yearVersionModel }: {version: IVersionModel, yearVersionModel: IYearVersionModel}) {
    const router = useRouter();
    const notification = useNotification();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const name = useForm('text', yearVersionModel?.name);
    const code = useForm('code', yearVersionModel?.code);
    const price = useForm('price', yearVersionModel?.price && maskPrice(yearVersionModel.price.toString()));
    const year = useForm('year', yearVersionModel?.year_model.toString());

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const newYear:IYearVersionModel = {
                code: code.value,
                name: name.value,
                price: +price.value.replace(/[^0-9]/g, ''),
                year_model: +year.value,
                versionModel: {
                    id: version.id
                }
            }

            const { success, message } = await apiAdmin.patch(`year-version-models/${yearVersionModel.id}`, newYear).then(res => res.data);
            if (success) {
                notification.execute('success', 'Ano da versão atualizado com sucesso.');
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
            <button className={components.button.icon_small} onClick={() => setShow(true)}><FiEdit /></button>
            {show &&
                <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] p-3 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="w-full max-w-xl bg-white p-3 rounded-md relative">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <h4 className="font-semibold text-zinc-900 text-lg">Atualizar ano em {version.name}</h4>
                            </div>
                            <button className={components.button.icon_small} onClick={() => setShow(false)}><FiX /></button>
                        </div>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-3">
                                <InputText
                                    id="name"
                                    title="Nome da versão*"
                                    type="text"
                                    placeholder="Ex.: 2023 Gasolina"
                                    {...name}
                                />
                                <InputText
                                    id="year"
                                    title="Ano da versão*"
                                    type="text"
                                    placeholder="Ex.: 2023"
                                    {...year}
                                />
                                <InputText
                                    id="price"
                                    title="Código*"
                                    type="text"
                                    placeholder="Ex.: 2023-1"
                                    {...code}
                                />
                                <InputPrice
                                    title="Preço recomendado*"
                                    {...price}
                                />
                            </div>
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