import { ModalCreateVersion } from "@/app/(administrative)/(veiculos)/_components/create-modals/create-version";
import { ModalRemoveModel } from "@/app/(administrative)/(veiculos)/_components/remove-modals/remove-model";
import { ModalUpdateModel } from "@/app/(administrative)/(veiculos)/_components/update-modals/update-model";
import { fetchData } from "@/helpers/fetch";
import { components } from "@/styles/tailwind";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft } from "react-icons/fi";

export default async function Page({ params }: { params: { id: string, model_id: string } }) {
    const { result } = await fetchData(`models/${params.model_id}`, 0);
    if(!result) return (
        <div className="flex flex-col">
            <Link href={`/motos/brand/${params.id}`} className={components.button.secondary + ' w-fit'}><FiChevronLeft /> Voltar</Link>
            <span className={components.alerts.gray}>Modelo não foi encontrado</span>
        </div>
    )
    
    const { results } = await fetchData(`version-models?model-id=${params.model_id}`, 0);

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Link href={`/motos/brand/${params.id}`} className={components.button.icon_small}><FiChevronLeft /></Link>
                        <h2 className="text-lg font-semibold text-zinc-900 capitalize">{result.name}</h2>
                        <ModalRemoveModel model={result} />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <ModalUpdateModel model={result}/>
                    <ModalCreateVersion model={result} />
                </div>
            </div>
            <div className="flex flex-col">
                <h4 className="font-medium">Versões</h4>
                <p className="text-sm text-zinc-700">{results?.length} resultados</p>
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item) =>
                    <Link href={`/motos/brand/${params.id}/model/${params.model_id}/version/${item.id}`} className="p-3 bg-white border rounded-md flex gap-3 justify-between items-center hover:shadow-sm capitalize text-sm">
                        {item.name}
                        <FiArrowRight />
                    </Link>
                )}
            </div>
        </div>
    )
}