"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import SuppliersCards from "@/components/SuppliersCards/SuppliersCards";

// Endpoints
import { getSuppliersByConsortiumId } from "@/helpers/fetch.helper.supplier"; // Cambiar la función para obtener proveedores por ID de consorcio
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";

// Interfaces
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import Link from "next/link";
import useSesion from "@/helpers/useSesion";

// ------------------

const Supplies = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);

    useEffect(() => {
        const fetchConsortiums = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                    if (data.length > 0) {
                        setSelectedConsortiumId(data[0].id);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchConsortiums();
        }
    }, [token, data.id]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            if (!selectedConsortiumId) return;
            try {
                const response = await getSuppliersByConsortiumId(
                    selectedConsortiumId,
                    token
                );
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token && selectedConsortiumId) {
            fetchSuppliers();
        }
    }, [token, selectedConsortiumId]);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>
                    Portal{" "}
                    <span className="text-2xl font-thin">| Proveedores</span>
                </Title>

                <div className="flex items-center justify-between w-[98%]">
                    <div className="w-2/3">
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                            value={selectedConsortiumId || ""}
                            onChange={handleSelectChange}
                        >
                            {consortiums.length > 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        value={consortium.id}
                                        key={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex w-1/3">
                        <Link
                            className="flex justify-end w-full mr-5"
                            href={"/addSupplier"}
                        >
                            <Button className="w-1/2 p-2 rounded-[40px]">
                                Agregar Proveedor
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <h1 className="w-1/5 text-xl">Nombre</h1>
                    <h1 className="w-1/5 text-xl">Cuit</h1>
                    <h1 className="w-1/5 text-xl">E-mail</h1>
                    <h1 className="w-1/5 text-xl">Teléfono</h1>
                    <h1 className="w-1/5 text-xl">Dirección</h1>
                </div>
                {suppliers.length > 0 ? (
                    <SuppliersCards suppliers={suppliers} roles={data?.roles} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay proveedores registrados
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Supplies;
