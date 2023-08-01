import React, { useState, useEffect } from 'react';
import { OptionSelectProps } from '../../hooks/useSelect';
import { FiChevronDown, FiX } from 'react-icons/fi';
import slugify from 'slugify';

interface Props {
    title?: string;
    value: OptionSelectProps;
    onChange: any;
    options?: OptionSelectProps[];
    onBlur?: (str: string) => void;
}

const Autocomplete = ({ onChange, title, value, onBlur, options }: Props) => {
    const inputRef = React.useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setIsOpen(true);
    };

    const handleOptionClick = (option: OptionSelectProps) => {
        if (option) {
            onChange(option);
            setInputValue(option.name);
            setIsOpen(false);
        } else {
            console.log(value);
            { value && alert(option); }
            { value?.name && setInputValue(value.name) }
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (highlightedIndex > 0) {
                setHighlightedIndex(highlightedIndex - 1);
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (highlightedIndex < options.length - 1) {
                setHighlightedIndex(highlightedIndex + 1);
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (highlightedIndex !== -1) {
                setInputValue(options[highlightedIndex].name);
                onChange(options[highlightedIndex]);
                setIsOpen(false);
            }
        }
    };

    const handleOutsideClick = (event: any) => {
        setIsOpen(false)
        { value?.name ? setInputValue(value.name) : setInputValue('') }
    };

    useEffect(() => {
        if (value?.name) {
            setInputValue(value.name);
        } else {
            setInputValue('');
        }
    }, [value]);

    return (
        <div className="relative flex flex-col w-full flex-1">
            {title && <label className='text-sm font-medium mb-1 text-zinc-800'>{title}</label>}
            <div className="relative flex flex-col w-full" ref={inputRef}>
                <div className={`flex w-full px-4 py-2 rounded border bg-white focus:outline-none focus:border-blue-500 ${isOpen && 'border-primary-600'}`}>
                    <input
                        type="text"
                        className="w-full focus:outline-none text-sm h-8"
                        placeholder="Escolha um valor"
                        value={inputValue ?? ''}
                        onFocus={() => setIsOpen(true)}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {value?.name && <button className='mr-2' onClick={() => {
                        onChange(null)
                        setInputValue('');
                    }}><FiX /></button>}
                    <button onClick={() => setIsOpen(!isOpen)}><FiChevronDown /></button>
                </div>
                {isOpen && (
                    <div className="absolute top-[44px] z-[9999] w-full mt-2 bg-white rounded border max-h-72 overflow-auto">
                        <ul className="py-1">
                            {options.filter((option) =>
                                option.name.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
                            ).length === 0 &&
                                <span className='flex w-full text-sm px-3 py-2 text-red-700 bg-red-100'>Nenhuma opção pra mostrar</span>
                            }
                            {options
                                .filter((option) =>
                                    option.name.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
                                )
                                .map((option, index) => (
                                    <li
                                        key={index}
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${value?.id === option.id && 'bg-purple-100 text-purple-900 font-medium'} ${highlightedIndex === index && 'bg-gray-100'}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
            {isOpen && <div className='fixed top-0 left-0 right-0 bottom-0 z-[2]' onMouseDown={handleOutsideClick}></div>}
        </div>
    );
};

export default Autocomplete;