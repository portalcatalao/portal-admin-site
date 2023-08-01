import { useState } from "react";

interface Props {
    title: string;
    value: string;
    onChange: any;
    onChangeOption?: (name: string, description: string, place_id: string) => Promise<void>;
    setValue: any;
    options: Array<any>;
    onBlur: (str: string) => void;
    getPlace: (e: string) => Promise<void>;
}

export function AddressAutocomplete({ title, value, setValue, options, onChange, onBlur, getPlace }: Props) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    const handleOnChance = (e: any) => {
        onChange(e);
        { e.target.value && e.target.value != '' ? getPlace(e.target.value) : null };
    }

    const setSelectedThenCloseDropdown = (index: any) => {
        setValue(options[index].description);
        setSelectedOption(index);
        setIsOptionsOpen(false);
        onBlur(options[index].description);
    };

    return (
        <>
            <div className="flex flex-col gap-1 relative">
                <label className="text-sm font-medium text-zinc-800">{title}</label>
                <input
                    className={`h-12 border text-sm text-zinc-900 rounded-md outline-none p-3 focus:border-primary-600`}
                    type={'text'}
                    onFocus={() => setIsOptionsOpen(true)}
                    value={value}
                    onChange={(e) => handleOnChance(e)}
                />
                {options.length > 0 && isOptionsOpen && (
                    <div className="absolute top-[68px] z-[9999] w-full mt-2 bg-white rounded border max-h-72 overflow-auto">
                        <ul className="py-1">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm ${value === option.description && 'bg-purple-100 text-purple-900 font-medium'}`}
                                    onClick={() => setSelectedThenCloseDropdown(index)}
                                >
                                    {option.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {isOptionsOpen && <div className='fixed top-0 left-0 right-0 bottom-0 z-[2]' onMouseDown={() => setIsOptionsOpen(false)}></div>}
        </>
    )
}