"use client";

// Estilos y componentes
import { Button, ContainerDashboard } from "@/components/ui";

// Endpoints
import { getUserById } from "@/helpers/fetch.helper.user";
import { getAdminById } from "@/helpers/fetch.helper.admin";

// Interfaces
import { IUser } from "@/Interfaces/user.interfaces";
import { IAdmin } from "@/Interfaces/admin.interfaces";

// Hooks
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Image from "next/image";
import Link from "next/link";

// ----------------------

const Profile = () => {
    const path = usePathname();
    useAuth();
    const [userData, setUserData] = useState<IUser>();
    const [adminData, setAdminData] = useState<IAdmin>();
    const { token, data } = useSesion();
    const prevTokenRef = useRef<string | null>(null);

    useEffect(() => {
        if (token && token !== prevTokenRef.current) {
            const fetchData = async () => {
                try {
                    if (
                        data.roles?.[0] === "user" ||
                        data.roles?.[0] === "superadmin"
                    ) {
                        const response = await getUserById(data.id, token);
                        if (response?.ok) {
                            const data = await response.json();
                            setUserData(data);
                        }
                    } else {
                        const response = await getAdminById(data.id, token);
                        if (response?.ok) {
                            const data = await response.json();

                            setUserData(data);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
        prevTokenRef.current = token;
    }, [token, data]);

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="flex  w-[90%] h-full m-3 bg-slate-50 p-10 gap-10 rounded-[40px]">
                <div className="flex flex-col rounded-[40px] w-1/2 p-2  h-full bg-gray-400">
                    <div className="flex flex-col items-center justify-center w-full h-1/2 bg-white rounded-t-[40px] px-10 pt-2">
                        <div className="flex items-center justify-center pb-0 mb-2 border rounded-full w-200 h-200">
                            <Image
                                src=""
                                alt="Imagen de perfil"
                                className="rounded-full order"
                                width={200}
                                height={200}
                            />
                        </div>
                        <Link href="/addAvatar" className="w-full">
                            <Button className="w-full py-1 rounded-[40px]">
                                Cambiar Imagen
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col text-black w-full justify-between h-1/2 bg-white rounded-b-[40px] p-10 gap-3">
                        <div>
                            {data.roles?.[0] === "user" ||
                            data.roles?.[0] === "superadmin" ? (
                                <div>
                                    <h3>NOMBRE:{userData?.first_name}</h3>
                                    <h3>APELLIDO:{userData?.last_name}</h3>
                                    <h3>EMAIL: {userData?.email}</h3>
                                </div>
                            ) : (
                                <div>
                                    <h3>ADMINISTRADOR:{adminData?.name}</h3>
                                    <h3>EMAIL: {adminData?.email}</h3>
                                </div>
                            )}
                        </div>
                        <div className="w-full">
                            <Link
                                className="w-full h-full"
                                href="/dashboard/profile/updateUser"
                            >
                                <Button className="w-full rounded-[40px] py-2">
                                    Editar Informacion
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-[40px] w-1/2 h-full bg-gray-400 p-2">
                    <div className="w-full h-1/3 border rounded-[40px]"></div>
                    <div className="w-full h-2/3 border rounded-[40px]"></div>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default Profile;
