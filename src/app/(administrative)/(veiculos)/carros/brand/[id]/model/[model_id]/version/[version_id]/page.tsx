import { ModalCreateYear } from "@/app/(administrative)/(veiculos)/_components/create-modals/create-year";
import { ModalRemoveVersion } from "@/app/(administrative)/(veiculos)/_components/remove-modals/remove-version";
import { ModalRemoveYear } from "@/app/(administrative)/(veiculos)/_components/remove-modals/remove-year";
import { ModalUpdateVersion } from "@/app/(administrative)/(veiculos)/_components/update-modals/update-version";
import { ModalUpadateYear } from "@/app/(administrative)/(veiculos)/_components/update-modals/update-year";
import { fetchData } from "@/helpers/fetch";
import { components } from "@/styles/tailwind";
import Link from "next/link";
import { version } from "os";
import { FiArrowRight, FiChevronLeft, FiEdit, FiTrash } from "react-icons/fi";

export default async function Page({ params }: { params: { id: string, model_id: string, version_id: string  } }) {
    const { result } = await fetchData(`version-models/${params.version_id}`, 0);
    if(!result) return (
        <div className="flex gap-4 flex-col">
            <span className={components.alerts.gray}>Versão não foi encontrada</span>
            <Link href={`/carros/brand/${params.id}/model/${params.model_id}`} className={components.button.secondary + ' w-fit'}><FiChevronLeft /> Voltar</Link>
        </div>
    )
    
    const { results } = await fetchData(`year-version-models?version-id=${params.version_id}`, 0);

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Link href={`/carros/brand/${params.id}/model/${params.model_id}`} className={components.button.icon_small}><FiChevronLeft /></Link>
                        <h2 className="text-lg font-semibold text-zinc-900 capitalize">{result.name}</h2>
                        <ModalRemoveVersion version={result}/>
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <ModalUpdateVersion version={result} />
                    <ModalCreateYear version={result} />
                </div>
            </div>
            <div className="flex flex-col">
                <h4 className="font-medium">Anos de versões</h4>
                <p className="text-sm text-zinc-700">{results?.length} resultados</p>
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item) =>
                    <div className="p-3 bg-white border rounded-md flex gap-3 justify-between items-center hover:shadow-sm capitalize text-sm">
                        {item.name}
                        <div className="flex gap-1">
                            <ModalUpadateYear version={result} yearVersionModel={item} />
                            <ModalRemoveYear yearVersionModel={item} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}