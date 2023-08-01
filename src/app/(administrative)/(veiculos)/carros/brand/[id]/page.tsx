import { fetchData } from "@/helpers/fetch";
import { components } from "@/styles/tailwind";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft } from "react-icons/fi";
import { ModalCreateModel } from "../../../_components/create-modals/create-model";
import { ModalUpdateBrand } from "../../../_components/update-modals/update-brand";
import { ModalRemoveBrand } from "../../../_components/remove-modals/remove-brand";

export default async function Page({ params }: { params: { id: string } }) {
    const { result } = await fetchData(`brands/${params.id}`, 0);
    if(!result) return (
        <div className="flex flex-col">
            <Link href={`/carros`} className={components.button.secondary + ' w-fit'}><FiChevronLeft /> Voltar</Link>
            <span className={components.alerts.gray}>Marca não foi encontrado</span>
        </div>
    )

    const { results } = await fetchData(`models?brand-id=${params.id}`, 0);

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Link href={`/carros`} className={components.button.icon_small}><FiChevronLeft /></Link>
                        <h2 className="text-lg font-semibold text-zinc-900 capitalize">{result.name}</h2>
                        <ModalRemoveBrand brand={result}/>
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <ModalUpdateBrand brand={result} />
                    <ModalCreateModel brand={result} />
                </div>
            </div>
            <div className="flex flex-col">
                <h4 className="font-medium">Modelos</h4>
                <p className="text-sm text-zinc-700">{results?.length} resultados</p>
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item) =>
                    <Link href={`/carros/brand/${result.id}/model/${item.id}`} className="p-3 bg-white border rounded-md flex justify-between items-center hover:shadow-sm capitalize">
                        {item.name}
                        <FiArrowRight />
                    </Link>
                )}
            </div>
        </div>
    )
}