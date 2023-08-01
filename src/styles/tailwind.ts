export const components = {
    links: {
        default: "flex items-center gap-4 h-10 px-4 text-sm text-zinc-200 font-light rounded-md transition-all hover:bg-gray-800",
        active: "flex items-center gap-4 h-10 px-4 text-sm bg-gray-700 text-white font-medium rounded-md",
        default_red: "flex items-center gap-4 h-10 px-4 text-sm text-zinc-200 font-light rounded-md transition-all hover:bg-red-800",
        active_red: "flex items-center gap-4 h-10 px-4 text-sm bg-red-700 text-white font-medium rounded-md",
    },
    button: {
        text: 'text-sm font-semibold text-primary-500 flex items-center gap-2 hover:text-primary-600',
        primary: 'flex items-center justify-center bg-primary-500 text-white h-12 px-4 rounded-md shadow-md font-medium text-base hover:bg-primary-600 transition-colors',
        success: 'flex items-center justify-center bg-green-500 text-white h-12 px-4 rounded-md shadow-md font-medium text-base hover:bg-green-600 transition-colors',
        danger: 'flex items-center justify-center bg-red-500 text-white h-12 px-4 rounded-md shadow-md font-medium text-base hover:bg-red-600 transition-colors',
        dark: 'flex items-center justify-center bg-zinc-700 text-white h-12 px-4 rounded-md shadow-md font-medium text-base hover:bg-zinc-900 transition-colors',
        icon: 'w-10 h-10 flex items-center justify-center rounded-md bg-zinc-200 text-zinc-600 hover:bg-primary-500 hover:text-white transition-colors',
        icon_small: 'w-8 h-8 flex items-center justify-center rounded-md bg-zinc-200 text-zinc-600 hover:bg-zinc-300 transition-colors',
        icon_small_active: 'w-8 h-8 flex items-center justify-center rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors',
        secondary: 'cursor-pointer font-medium px-6 h-10 flex items-center justify-center gap-2 rounded-md bg-zinc-200 text-zinc-600 text-sm hover:bg-zinc-300 transition-colors',
        filter_fast: "border h-10 px-4 rounded-md text-sm font-medium flex items-center gap-1 text-zinc-700 hover:border-primary-500 hover:bg-primary-500 hover:text-white transition-colors",
        filter_fast_active: "border h-10 px-4 rounded-md text-sm font-medium flex items-center gap-1 border-primary-500 bg-primary-500 text-white transition-colors",
    },
    alerts: {
        yellow: '',
        gray: "py-1 px-4 mt-4 w-fit flex bg-gray-200 text-sm font-medium rounded-md h-10 items-center",
        red: "py-1 px-4 w-fit flex bg-red-200 text-red-700 text-sm font-medium rounded-md h-10 items-center",
    },
    tab: {
        active: "flex flex-1 justify-center border-b-2 border-primary-500 py-2 text-primary-500 font-medium transition-colors",
        default: "flex flex-1 justify-center border-b-2 py-2 text-zinc-600 transition-colors"
    },
    container: 'w-full max-w-[1312px] mx-auto relative px-3 lg:px-0'
}