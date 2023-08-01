import { useBooleanProps } from "../../hooks/useBoolean";

interface Props extends useBooleanProps{
    title?: string;
    description?: string;
}

export function SelectBoolean({description, title, onChange, state, error}: Props) {
    return (
        <div className="flex flex-col gap-1">
            {title && <label className='text-sm font-medium mb-1 text-zinc-800'>{title}</label>}
            {description && <span>{description}</span>}
            <div className="flex gap-3">
                <button className={`h-10 px-4 border rounded-md text-sm font-medium ${state && 'border-primary-600 text-primary-600'}`} onClick={() => onChange(true)}>Sim</button>
                <button className={`h-10 px-4 border rounded-md text-sm font-medium ${!state && 'border-primary-600 text-primary-600'}`} onClick={() => onChange(false)}>Não</button>
            </div>
            {error && <span>{error}</span>}
        </div>
    );
}