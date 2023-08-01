import { cookies } from "next/dist/client/components/headers";
import { Aside } from "./_components/aside"
import { Navbar } from "./_components/navbar"
import { IUser } from "@/types/imoveis";
import { Notification } from "./_components/notification";
import { redirect } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const res = cookies().get('mobilar_admin.user');

    if(!res) {
        redirect('/login');
    }

    const user = JSON.parse(res.value);

    return (
        <div className="flex w-full relative">
            <div className="hidden lg:flex"><Aside user={user} /></div>
            <div className="max-w-screen overflow-hidden flex flex-col flex-1">
                <Navbar user={user} />
                <Notification />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
