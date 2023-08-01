'use client'

import Loading from "@/app/loading";
import Autocomplete from "@/components/forms-components/autocomplete";
import { OptionSelectProps, useSelect } from "@/hooks/useSelect"
import { apiAdmin } from "@/services/api";
import { components } from "@/styles/tailwind";
import { IVersionModel, IYearVersionModel } from "@/types/veiculos";
import { typeVehicle } from "@/utils/data";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import slugify from "slugify";

interface Props {
    references?: OptionSelectProps[];
    brands?: OptionSelectProps[];
    models?: OptionSelectProps[];
    years?: OptionSelectProps[];
}

export function Form({ references, brands }: Props) {
    const reference = useSelect(references, references[0]);
    const brand = useSelect(brands);
    const type = useSelect(typeVehicle, typeVehicle[0]);
    const model = useSelect();
    const [models, setModels] = useState([]);
    const [versions, setVersions] = useState([]);
    const year = useSelect();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const findBrands = async (type: number) => {
        try {
            setLoading(true);
            const { results: brands } = await apiAdmin.get(`fipe/brands?type=${type}&reference=${reference.value.id}`).then(res => res.data);
            brand.setOptions(brands)
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const findModels = async () => {
        try {
            setLoading(true);
            const { results } = await apiAdmin.get(`fipe/models?type=${type.value.id}&reference=${reference.value.id}&brandId=${brand.value.id}`).then(res => res.data);
            await apiAdmin.get(`models?type=${type.value.model}&brand-id-string=${slugify(brand.value.name, { lower: true })}`).then(({ data }) => {
                setModels(data.results);
            });
            await apiAdmin.get(`version-models?brand-id-string=${slugify(brand.value.name, { lower: true })}&type=${type.value.versionModel}`).then(({ data }) => {
                setVersions(data.results);
            });
            model.setOptions(results);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const findYears = async () => {
        try {
            setLoading(true);
            const { results } = await apiAdmin.get(`fipe/years?type=${type.value.id}&reference=${reference.value.id}&brandId=${brand.value.id}&modelId=${model.value.id}`).then(res => res.data);

            year.setOptions(results);
            return results;
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const findDetails = async () => {
        try {
            setLoading(true);
            const { result } = await apiAdmin.get(`fipe/details?type=${type.value.id}&reference=${reference.value.id}&brandId=${brand.value.id}&modelId=${model.value.id}&fuelType=${extractFuelType(year.value.name)}&year=${year.value.id.toString().split('-')[0]}`).then(res => res.data);
            setResult(result);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    //Filtrar as versões que tem o nome do modelo
    const filterVersions = (item) => {
        return model.options?.filter(
            model =>
                model.name.toLowerCase().startsWith(item.name.toLowerCase() + ' ') ||
                model.name.toLowerCase() === item.name.toLowerCase()
        );
    }

    //Sincronizar versões
    const syncVersions = async (model, versions) => {
        try {
            setLoading(true);
            for (let i = 0; i < versions.length; i++) {
                console.log(versions[i]);
                if (!checkPendingVersion(model, versions[i].name)) {
                    const { results } = await apiAdmin.get(`fipe/years?type=${type.value.id}&reference=${reference.value.id}&brandId=${brand.value.id}&modelId=${versions[i].id}`).then(res => res.data);
                    const year = results ? results[0] : null;
                    const res = year ? await apiAdmin.get(`fipe/details?type=${type.value.id}&reference=${reference.value.id}&brandId=${brand.value.id}&modelId=${versions[i].id}&fuelType=${extractFuelType(year.name)}&year=${year.id.toString().split('-')[0]}`).then(res => res.data) : null;
                    const result = res ? res.result : null;
                    if (result) {
                        const newVersion: IVersionModel = {
                            name: versions[i].name,
                            fipe_code: result.fipe,
                            model: {
                                id: model.id
                            },
                            type: type.value.versionModel
                        }

                        const { success, message } = await apiAdmin.post('version-models', newVersion).then(res => res.data);
                        console.log(success, message);
                        if (message?.includes('Duplicate')) {
                            const { result: version } = await apiAdmin.get(`version-models/fipe/${result.fipe}`).then(res => res.data);
                            const { success, message } = await apiAdmin.patch(`version-models/${version.id}`, newVersion).then(res => res.data);
                            console.log(success, message);
                        }
                    }
                }
            }
            await apiAdmin.get(`version-models?brand-id-string=${slugify(brand.value.name, { lower: true })}`).then(({ data }) => {
                setVersions(data.results);
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    //Extrair a versão do modelo
    const extractVersion = (model: string, model_version: string) => {
        if (model_version.toLowerCase().startsWith(`${model.toLowerCase()} `) || model.toLowerCase() === model_version.toLowerCase()) {
            let version = model_version.toLowerCase().replace(`${model.toLowerCase()}`, '').replaceAll('  ', ' ').trim();
            return version;
        } else {
            return model_version;
        }
    }

    //Verificar se a versão está cadastrada
    const checkPendingVersion = (model, version: string) => {
        return versions.find(item => item.name.toLowerCase() === version.toLocaleLowerCase() && model.name.toLocaleLowerCase() === item.model.name.toLocaleLowerCase()) ? true : false;
    }

    //Extrair tipo do combustivel
    const extractFuelType = (value: string) => {
        let fuelType = '1';

        if (value.includes('Gasolina')) {
            fuelType = '1';
        } else if (value.includes('Diesel')) {
            fuelType = '3';
        } else {
            fuelType = '2';
        }

        return fuelType;
    }

    //Sincronizar Anos
    const syncYears = async () => {
        try {
            setLoading(true);
            const date = new Date();
            const current_year = date.getFullYear() + 1;

            for (let i = 0; i < versions.length; i++) {
                const { results: years } = await apiAdmin.get(`/fipe/code?reference=${reference.value.id}&type=${type.value.id}&fipe=${versions[i].fipe_code}`).then(res => res.data);
                console.log(versions[i].name, years);
                if (years) {
                    for (let j = 0; j < years.length; j++) {
                        if (!versions[i].years.find(item => item.code === years[j].name)) {
                            const year_version = years[j].id.split('-')[0];
                            const fuel_type = extractFuelType(years[j].name);

                            if (+year_version <= current_year) {
                                const { result } = await apiAdmin.get(`fipe/details/code?type=${type.value.id}&reference=${reference.value.id}&fipe=${versions[i].fipe_code}&fuelType=${fuel_type}&year=${years[j].id.toString().split('-')[0]}`).then(res => res.data);
                                if (result) {
                                    const newYear: IYearVersionModel = {
                                        code: years[j].id,
                                        name: years[j].name,
                                        price: result?.price.replace(/[^0-9]/g, ''),
                                        year_model: result.year,
                                        versionModel: {
                                            id: versions[i].id
                                        }
                                    }

                                    const { success, message } = await apiAdmin.post('year-version-models', newYear).then(res => res.data);
                                    console.log(message ?? success);
                                }
                            }
                        }
                    }
                }
            }

            alert('Concluído.');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const syncYearsByModel = async (model) => {
        try {
            setLoading(true);
            const date = new Date();
            const current_year = date.getFullYear() + 1;
            const versionsModel = versions.filter(item => item.model.id === model.id);

            for (let i = 0; i < versionsModel.length; i++) {
                const { results: years } = await apiAdmin.get(`/fipe/code?reference=${reference.value.id}&type=${type.value.id}&fipe=${versionsModel[i].fipe_code}`).then(res => res.data);
                console.log(versionsModel[i].name, years);
                if (years) {
                    for (let j = 0; j < years.length; j++) {
                        if (!versionsModel[i].years.find(item => item.code === years[j].name)) {
                            const year_version = years[j].id.split('-')[0];
                            const fuel_type = extractFuelType(years[j].name);

                            if (+year_version <= current_year) {
                                const { result } = await apiAdmin.get(`fipe/details/code?type=${type.value.id}&reference=${reference.value.id}&fipe=${versionsModel[i].fipe_code}&fuelType=${fuel_type}&year=${years[j].id.toString().split('-')[0]}`).then(res => res.data);
                                if (result) {
                                    const newYear: IYearVersionModel = {
                                        code: years[j].id,
                                        name: years[j].name,
                                        price: result?.price.replace(/[^0-9]/g, ''),
                                        year_model: result.year,
                                        versionModel: {
                                            id: versionsModel[i].id
                                        }
                                    }

                                    const { success, message } = await apiAdmin.post('year-version-models', newYear).then(res => res.data);
                                    console.log(message ?? success);
                                }
                            }
                        }
                    }
                }
            }

            alert('Concluído.');
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (type.value) {
            findBrands(+type.value.id);
        } else if (brand.options) {
            brand.clear();
            brand.setOptions([]);
        };
    }, [type.value]);

    useEffect(() => {
        if (brand.value) {
            findModels();
        } else if (model.options) {
            setModels([]);
            model.clear();
            model.setOptions([]);
        };
    }, [brand.value]);

    useEffect(() => {
        if (model.value) {
            findYears();
        } else if (year.options) {
            year.clear();
            year.setOptions([]);
        };
    }, [model.value]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4">
                <div className="w-full flex items-end gap-4 p-4 bg-white rounded-md border">
                    {loading && <Loading />}
                    <Autocomplete
                        title="Tipo de veículo"
                        {...type}
                    />
                    <Autocomplete
                        title="Referência"
                        {...reference}
                    />
                    <Autocomplete
                        title="Marca"
                        {...brand}
                    />
                    <Autocomplete
                        title="Modelo"
                        {...model}
                    />
                    <Autocomplete
                        title="Ano do modelo"
                        {...year}
                    />
                    <button className={components.button.primary} onClick={findDetails}>Buscar</button>
                </div>
                {result &&
                    <div className="flex flex-col gap-2 w-full max-w-lg bg-black rounded-md p-4 text-white">
                        <h4 className="text-xl font-medium mb-1">Resultado da busca:</h4>
                        <div className="flex gap-1">
                            <span className="text-white/50">Marca:</span>
                            <strong>{result.brand}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">Modelo:</span>
                            <strong>{result.model}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">AnoModelo:</span>
                            <strong>{result.year}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">Combustível:</span>
                            <strong>{result.fuel}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">Código Fipe:</span>
                            <strong>{result.fipe}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">Mês de referência:</span>
                            <strong>{result.reference}</strong>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-white/50">Valor recomendado:</span>
                            <strong>{result.price}</strong>
                        </div>
                    </div>
                }
            </div>
            {models.length > 0 && <div className="flex mt-4 flex-col w-full p-4 bg-white rounded-md border">
                <div className="flex w-full justify-between items-center mb-4">
                    <h4 className="font-medium">Modelos</h4>
                    <button onClick={syncYears} className={components.button.secondary}><FiRefreshCcw /> Sincronizar anos</button>
                </div>
                <ul className="grid gap-4 mt-2">
                    {models.map(item => {
                        const versions = filterVersions(item)?.map(version => {
                            return {
                                name: extractVersion(item.name, version.name),
                                id: version.id
                            }
                        });
                        return (
                            <li key={item.id} className="flex flex-col font-medium text-primary-500 p-3 bg-zinc-100 capitalize">
                                <div className="flex justify-between items-center mb-4 w-full">
                                    {item.name}
                                    <div className="flex gap-2">
                                        <button className={components.button.secondary} onClick={() => syncYearsByModel(item)}>Sincronizar anos</button>
                                        <button className={components.button.secondary} onClick={() => syncVersions(item, versions)}>Sincronizar versões</button>
                                    </div>
                                </div>
                                <ul className="grid grid-cols-4 gap-2 mt-1">
                                    {
                                        versions?.map((version: any) => {
                                            const pendingVersion = checkPendingVersion(item, version.name);
                                            return (
                                                <li key={version.id} className={`list-inside h-10 flex justify-center flex-col text-sm py-1 px-3 ${pendingVersion ? 'bg-green-500 text-white' : 'bg-yellow-50 text-yellow-700'} rounded-md`}>
                                                    {version.name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </div>
    )
}