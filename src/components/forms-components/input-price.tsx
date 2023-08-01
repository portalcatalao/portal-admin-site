interface Props {
    title?: string;
    disabled?: boolean;
    value?: string;
    onChange?: any;
    onBlur?: any;
    error?: string;
}

export function InputPrice({ title, value, onChange, onBlur, error }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-800">{title}</label>
            <div className="relative flex items-center">
                <input
                    className={`h-12 border text-sm text-zinc-900 rounded-md outline-none p-3 pl-10 ${error ? 'border-red-500' : 'focus:border-primary-600'}`}
                    type={'text'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <span className="absolute left-3">R$</span>
            </div>
            {error &&
                <span className="text-sm font- text-red-500">{error}</span>
            }
        </div>
    )
}