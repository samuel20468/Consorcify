"use client";

// Estilos y componentes
import { ContainerSideBar } from "../ui";
import { itemsNavbarSuperAdmin } from "@/utils/data";

// Hooks
import { usePathname } from "next/navigation";
import Link from "next/link";

// -------------------------

const SideBarSuperAdmin = () => {
    const pathname = usePathname();

    return (
        <ContainerSideBar>
            <nav className="flex flex-col h-full justify-evenly">
                {itemsNavbarSuperAdmin.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <Link
                            href={item.link}
                            key={item.id}
                            className={`flex flex-col items-center text-xs lg:text-base ${
                                isActive
                                    ? "shadow-inner shadow-slate-950 py-2"
                                    : ""
                            }`}
                        >
                            <div>{item.icon}</div>
                            <h1>{item.title}</h1>
                        </Link>
                    );
                })}
            </nav>
        </ContainerSideBar>
    );
};

export default SideBarSuperAdmin;
