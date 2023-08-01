import { useCountProps } from "../../hooks/useCount";
import { components } from "../../styles/tailwind";

interface Props extends useCountProps {
    title?: string;
    subtitle?: string;
}

export function SelectQuantity({subtitle, title, add, remove, value}: Props) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
                {title && <span className="text-sm font-medium mb-1 text-zinc-800">{title}</span>}
                {subtitle && <span className="font-light text-xs text-zinc-700">{subtitle}</span>}
            </div>
            <div className="flex items-center gap-2">
                <button className={components.button.icon_small} onClick={remove}>-</button>
                <span className="w-8 h-8 border flex items-center justify-center rounded-md">{value}</span>
                <button className={components.button.icon_small} onClick={add}>+</button>
            </div>
        </div>
    )
}