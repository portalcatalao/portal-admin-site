'use client'

import React, { useState, useEffect } from 'react';
import { OptionSelectProps } from '../../hooks/useSelect';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
    title: string;
    label: string;
    value: OptionSelectProps[];
    onChange: any;
    options?: OptionSelectProps[];
    onBlur?: (str: string) => void;
}

export function Multiselect({ onChange, title, value, options, label }: Props) {
    const inputRef = React.useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOutsideClick = (event: any) => {
        setIsOpen(false)
    };

    return (
        <div className="relative flex flex-col w-full flex-1">
            <label className='text-sm font-medium mb-1 text-zinc-800'>{title}</label>
            <div className="relative flex flex-col w-full" ref={inputRef}>
                <div className={`flex w-full px-4 py-2 bg-white rounded border focus:outline-none ${isOpen && 'border-primary-600'}`}>
                    <input
                        type="text"
                        className="w-full focus:outline-none text-sm h-8"
                        placeholder="Escolha um valor"
                        value={label}
                        onFocus={() => setIsOpen(true)}
                        onChange={() => {}}
                    />
                    <button><FiChevronDown /></button>
                </div>
                {isOpen && (
                    <div className="mt-2 absolute flex flex-col gap-2 bg-white w-full border z-[9999] top-[44px] rounded-md p-3">
                        {options.map((option) => (
                            <label
                                key={option.id}
                                className="inline-flex items-center mt-1 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    checked={value.some(
                                        (selected) => selected?.id === option?.id
                                    )}
                                    onChange={() => onChange(option)}
                                    className="form-checkbox h-4 w-4 text-purple-700 transition duration-150 ease-in-out"
                                />
                                <span className="ml-2 text-sm">{option.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            {isOpen && <div className='fixed top-0 left-0 right-0 bottom-0 z-[2]' onMouseDown={handleOutsideClick}></div>}
        </div>
    );
};