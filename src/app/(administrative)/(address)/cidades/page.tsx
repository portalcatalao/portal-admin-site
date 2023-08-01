import { fetchDataImoveis } from "@/helpers/fetch";
import { components } from "@/styles/tailwind";
import { ICity } from "@/types/imoveis";
import Link from "next/link";
import {FiArrowRight} from "react-icons/fi";

export default async function Page() {
    const {results} = await fetchDataImoveis('address/states/9/cities');
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-4 lg:flex-row justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900">Cidades em Goiás</h2>
                    <p className="text-sm text-zinc-700">{results?.length} resultados</p>
                </div>
                {/* <div className="flex justify-between gap-4">
                    <Link href={`/imobiliarias/colaboradores/cadastrar`} className={components.button.primary + ' text-sm'}>Cadastrar</Link>
                </div> */}
            </div>
            <div className='grid md:grid-cols-4 gap-4'>
                {results?.map((item: ICity) =>
                    <Link href={`/cidades/${item.id}`} className="p-3 bg-white border rounded-md flex justify-between items-center hover:shadow-sm">
                        {item.name}
                        <FiArrowRight />
                    </Link>
                )}
            </div>
        </div>
    )
}