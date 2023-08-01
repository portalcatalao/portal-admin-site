import { useState, useEffect } from "react";
import { addressApi } from "../services/addressApi";
import { api } from "../services/api";
import { IAddress, ICity, IDistrict, IState } from "../types/interfaces";
import { states } from "../utils/states";
import { useForm, useFormProps } from "./useForm";
import { useSelect, useSelectProps } from "./useSelect";
import { useSearchParams } from "next/navigation";
import { findValueInOptions } from "../helpers/string";

export interface useAddressProps {
    cep: useFormProps,
    address: useFormProps,
    city: useSelectProps,
    state: useSelectProps,
    route: useFormProps,
    district: useSelectProps,
    number: useFormProps,
    walk: useFormProps,
    complement: useFormProps,
    loading: boolean,
    error: boolean,
    cityOptions: Array<any>,
    addressOptions: Array<any>,

    getAddress(): Promise<any>,
    findByZipcode(zipcode: string): Promise<void>,
    autoCompleteCity(value: string): Promise<void>,
    autoCompleteAddress(value: string): Promise<void>,
    startProps(state: IState, city: ICity, district: IDistrict): Promise<void>,
    setCityPlaceId(name: string, description: string, place_id?: string): Promise<void>;
}

export function useAddress(): useAddressProps {
    const [initialAddress, setInitialAddress] = useState<IAddress>(null);
    const searchParams = useSearchParams();

    const cep = useForm('cep');
    const address = useForm('address');
    const city = useSelect();
    const state = useSelect();
    const route = useForm('text');
    const district = useSelect();
    const number = useForm('number');
    const walk = useForm('number');
    const complement = useForm('text');

    const [cityOptions, setCityOptions] = useState([]);
    const [addressOptions, setAddressOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        state.setOptions(states);
    }, []);

    useEffect(() => {
        if (state.value) {
            findCitiesByState();
        } else {
            city.setOptions([]);
        }
    }, [state.value]);

    useEffect(() => {
        if (city.value) {
            findDistrictsByCity();
        } else {
            district.setOptions([]);
        }
    }, [city.value]);

    function findInOptions(param: string, options) {
        let optionSelected;
        options.forEach(option => {
            { option.enum === param || option.name === param ? optionSelected = option : null }
        });
        return optionSelected;
    }

    const startProps = async (stateValue: IState, city: ICity, district?: IDistrict) => {
        setInitialAddress({
            city,
            district,
            state: stateValue
        })
        state.onChange(findInOptions(stateValue.name, states));
    }

    const findCitiesByState = async () => {
        const q_city = searchParams.get('city');
        if (state.value.id) {
            const { data } = await api.get(`address/states/${state.value.id}/cities`);
            city.setOptions(data.results);
            { initialAddress?.city && data.results && city.onChange(findInOptions(initialAddress.city.name, data.results)) }
            { q_city && data.results && city.onChange(findValueInOptions(q_city, data.results)) }
        }
    }

    const findDistrictsByCity = async () => {
        const q_district = searchParams.get('district');
        if (city.value.id) {
            const { data } = await api.get(`address/cities/${city.value.id}/districts`);
            district.setOptions(data.results);
            { initialAddress?.district && data.results && district.onChange(findInOptions(initialAddress.district.name, data.results)) }
            { q_district && data.results && district.onChange(findValueInOptions(q_district, data.results)) }
        }
    }

    const autoCompleteAddress = async (value: string) => {
        const places = await api.get(`geolocalization/autocomplete/${value}`);
        setAddressOptions(places.data);
        places.data;
    }

    const autoCompleteCity = async (value: string) => {
        const { data } = await addressApi.get(`cities/autocomplete/${value}`);
        setCityOptions(data.results);
        return data.results;
    }

    const setCityPlaceId = async (name: string, description: string, place_id?: string) => {
        try {
            setLoading(true);
            //city.setValue(name);
            const address = await addressApi.get(`/geolocalization/place_id/${place_id}`).then(res => res.data);
            if (!address.error) {
                //{ address.city && city.setValue(address.city) }
                { address.state && state.onChange(address.state) }
            }
        } catch (error) {

        }
        finally {
            setLoading(false);
        }
    }

    const findByZipcode = async (zipcode: string) => {
        try {
            setLoading(true);
            if (zipcode === '') return;
            const address = await addressApi.get(`/geolocalization/zipcode/${zipcode}`).then(res => res.data);
            if (!address.error) {
                //{ address.city && city.setValue(address.city) }
                { address.state && state.onChange(address.state) }
                //{ address.district && district.setValue(address.district) }
                { address.route ? route.setValue(address.route) : route.setValue('') }
                { !address.route || !address.state || !address.city || !address.district ? setError(true) : setError(false) }
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const getAddress = async () => {
        return {
            cep: cep.value,
            address: address.value,
            city: city.value,
            state: state.value,
            route: route.value,
            district: district.value,
            number: number.value,
            walk: walk.value,
            complement: complement.value
        }
    }

    return {
        cep,
        address,
        city,
        state,
        route,
        district,
        number,
        walk,
        complement,
        loading,
        error,
        cityOptions,
        addressOptions,

        getAddress,
        findByZipcode,
        autoCompleteCity,
        autoCompleteAddress,
        setCityPlaceId,
        startProps
    }
}