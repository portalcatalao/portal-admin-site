import { LoadingSvg } from "../components/loading-svg";

export default function Loading() {
    return (
        <div className="fixed z-[9999] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center w-full h-screen">
            <LoadingSvg color={'#fff'} show={true}/>
        </div>
    )
}