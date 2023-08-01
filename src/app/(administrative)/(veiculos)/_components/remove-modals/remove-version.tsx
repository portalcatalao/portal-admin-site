'use client'

import Loading from "@/app/loading";
import { useNotification } from "@/hooks/useNotification";
import { apiAdmin } from "@/services/api";
import { components } from "@/styles/tailwind";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { ModalRemove } from "../../../_components/modal-remove";
import { IVersionModel, IYearVersionModel } from "@/types/veiculos";

export function ModalRemoveVersion({ version }: { version: IVersionModel }) {
    const router = useRouter();
    const notification = useNotification();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { success, message } = await apiAdmin.delete(`version-models/${version.id}`).then(res => res.data);

            if (success) {
                notification.execute('success', message);
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
            <button className={components.button.icon_small} onClick={() => setShow(true)}>
                <FiTrash />
            </button>
            {show && <ModalRemove 
                close={() => setShow(false)}
                submit={handleSubmit}
                subtitle={`Deseja mesmo remover a versão ${version.name}`}
                title={'Remover ano'}
            />}
            {loading && <Loading />}
        </>
    )
}