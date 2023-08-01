import { components } from "@/styles/tailwind";
import { FiX } from "react-icons/fi";

export function ModalRemove({ title, subtitle, submit, close }) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] p-3 flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-xl bg-white p-3 rounded-md relative">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 text-lg">{title}</h4>
                        <p className="">{subtitle}</p>
                    </div>
                    <button className={components.button.icon_small} onClick={close}><FiX /></button>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button className={components.button.dark} onClick={close}>Cancelar</button>
                    <button className={components.button.primary} onClick={() => {
                        submit();
                        close();
                    }}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}