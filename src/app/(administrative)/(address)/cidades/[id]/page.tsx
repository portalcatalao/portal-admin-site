import { fetchDataImoveis } from "@/helpers/fetch"
import { components } from "@/styles/tailwind";
import { IDistrict } from "@/types/imoveis";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiEdit, FiTrash } from "react-icons/fi";
import { ModalUpdateCity } from "../../_components/update-city";
import { ModalCreateDistrict } from "../../_components/create-district";
import { ModalUpdateDistrict } from "../../_components/update-district";
import { ModalRemoveDistrict } from "../../_components/remove-district";

export default async function Page({ params }: { params: { id: string } }) {
    const { results, city } = await fetchDataImoveis(`address/cities/${params.id}/districts`, 0);

    if(!city) {
        return <span className={components.alerts.gray}>Cidade não encontrada</span>
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Link href={`/cidades`} className={components.button.icon_small}><FiChevronLeft /></Link>
                        <h2 className="text-lg font-semibold text-zinc-900">Bairros em {city?.name}</h2>
                    </div>
                    <p className="text-sm text-zinc-700">{results?.length} resultados</p>
                </div>
                <div className="flex justify-between gap-4">
                    <ModalUpdateCity city={city}/>
                    <ModalCreateDistrict city={city}/>
                </div>
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item: IDistrict) =>
                    <div key={item.id} className="p-3 bg-white border rounded-md flex justify-between items-center hover:shadow-sm text-sm">
                        {item.name}
                        <div className="flex gap-1">
                            <ModalUpdateDistrict district={item} />
                            <ModalRemoveDistrict district={item} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}