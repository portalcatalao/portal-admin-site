interface Props {
    id?: string;
    title: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: any;
    onBlur?: any;
    error?: string;
}

export function InputText({title, disabled, error, id, onBlur, onChange, placeholder, type, value}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-800">{title}</label>
            <input 
                className={`h-12 border text-sm text-zinc-900 rounded-md outline-none p-3 ${error ? 'border-red-500' : 'focus:border-primary-600'}`}
                value={value}
                onChange={onChange}
                type={type ?? 'text'}
                placeholder={placeholder ?? ''}
            />
            {error && <span className="text-sm font- text-red-500">{error}</span>}
        </div>
    )
}