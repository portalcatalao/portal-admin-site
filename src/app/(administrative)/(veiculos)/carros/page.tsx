import { fetchData } from "@/helpers/fetch"
import { components } from "@/styles/tailwind";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { ModalCreateBrand } from "../_components/create-modals/create-brand";

export default async function Page() {
    const {results} = await fetchData(`brands?type=brandcar`, 0);

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900">Marcas de Carros</h2>
                    <p className="text-sm text-zinc-700">{results?.length} resultados</p>
                </div>
                <div className="flex justify-between gap-4">
                    <ModalCreateBrand />
                </div>
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item) =>
                    <Link href={`/carros/brand/${item.id}`} className="p-3 bg-white border rounded-md flex justify-between items-center hover:shadow-sm capitalize">
                        {item.name}
                        <FiArrowRight />
                    </Link>
                )}
            </div>
        </div>
    )
}