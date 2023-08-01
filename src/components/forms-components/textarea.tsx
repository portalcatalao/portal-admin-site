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

export function Textarea({title, disabled, error, id, onBlur, onChange, placeholder, type, value}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-800">{title}</label>
            <textarea 
                className="h-28 border rounded-md text-sm text-zinc-900 focus:border-primary-600 outline-none p-3"
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? ''}
            />
        </div>
    )
}