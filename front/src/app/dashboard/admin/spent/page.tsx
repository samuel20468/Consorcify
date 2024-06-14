"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Select, Title } from "@/components/ui";
import ExpenditureCards from "@/components/ExpenditureCards/ExpenditureCards";

// Endpoints
import { getConsortiumsByAdminId } from "@/helpers/fetch.helper.consortium";
import { getSuppliers } from "@/helpers/fetch.helper.supplier";

// Interfaces
import { IExpenditure } from "@/Interfaces/expenditures.interfaces";
import { ISupplier } from "@/Interfaces/suppliers.interfaces";
import { IConsortium } from "@/Interfaces/consortium.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { getExpenditures } from "@/helpers/fetch.helper.expenditure";
import Link from "next/link";

// ------------------

const Spent = () => {
    useAuth();
    const { token, data } = useSesion();
    const pathname = usePathname();
    const [expenditures, setExpenditures] = useState<IExpenditure[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [selectedConsortiumId, setSelectedConsortiumId] = useState<
        string | null
    >(null);
    const [sortConfig, setSortConfig] = useState<{
        field: keyof IExpenditure;
        order: "asc" | "desc";
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getExpenditures(token);
                if (response) {
                    const data = await response.json();
                    setExpenditures(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumsByAdminId(data.id, token);
                if (response) {
                    const data = await response.json();
                    setConsortiums(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSuppliers(token);
                if (response) {
                    const data = await response.json();
                    setSuppliers(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    // Filtros

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedConsortiumId(event.target.value);
    };

    const selectedConsortium = consortiums.find(
        (c) => c.id === selectedConsortiumId
    );

    // Ordenamientos

    const handleSort = (field: keyof IExpenditure, order: "asc" | "desc") => {
        const sortedData = [...expenditures].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];

            if (typeof valueA === "string" && typeof valueB === "string") {
                return order === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else if (
                typeof valueA === "number" &&
                typeof valueB === "number"
            ) {
                return order === "asc" ? valueA - valueB : valueB - valueA;
            } else {
                return 0;
            }
        });

        setExpenditures(sortedData);
    };

    const handleHeaderClick = (field: keyof IExpenditure) => {
        let order: "asc" | "desc" = "asc";
        if (
            sortConfig &&
            sortConfig.field === field &&
            sortConfig.order === "asc"
        ) {
            order = "desc";
        }
        setSortConfig({ field, order });
        handleSort(field, order);
    };

    return (
        <div className="h-screen">
            <ContainerDashboard>
                <Title>Gastos</Title>
                <div className="flex items-center justify-between w-[98%]">
                    <div className="flex justify-start w-2/3 gap-3">
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

                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            className="w-1/3 h-10 px-2 my-1 text-gray-200 rounded-md shadow-xl cursor-pointer bg-input focus:outline-none no-spinners"
                            defaultValue=""
                            // value={adminRegister.sat}
                            // onChange={handleSelect}
                        >
                            <option value="" disabled>
                                Seleccionar proveedor
                            </option>
                            {suppliers.length > 0 &&
                                suppliers.map((supplier) => (
                                    <option
                                        value={supplier.id}
                                        key={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex w-1/3">
                        <Link
                            href="/addSpent"
                            className="flex justify-end w-full mr-5"
                        >
                            <Button className="w-1/2 p-2 rounded-[40px]">
                                Agregar Gasto
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-[90%] border-t border-b border-white flex justify-between p-2 mt-5 text-center">
                    <div className="w-1/5 text-xl">
                        <h1
                            className="cursor-pointer"
                            onClick={() => handleHeaderClick("description")}
                        >
                            Descripción
                        </h1>
                    </div>
                    <div className="w-1/5 text-xl">
                        <h1
                            className="cursor-pointer"
                            onClick={() => handleHeaderClick("category")}
                        >
                            Categoría
                        </h1>
                    </div>
                    <div className="w-1/5 text-xl">
                        <h1
                            className="cursor-pointer"
                            onClick={() => handleHeaderClick("supplier")}
                        >
                            Proveedor
                        </h1>
                    </div>
                    <div className="w-1/5 text-xl">
                        <h1
                            className="cursor-pointer"
                            onClick={() => handleHeaderClick("total_amount")}
                        >
                            Monto
                        </h1>
                    </div>
                    <div className="w-1/5 text-xl">
                        <h1>Eliminar</h1>
                    </div>
                </div>
                {expenditures.length > 0 ? (
                    <ExpenditureCards expenditures={expenditures} />
                ) : (
                    <div className="p-8">
                        <h1 className="text-2xl">
                            Aún no hay gastos registrados
                        </h1>
                    </div>
                )}
            </ContainerDashboard>
        </div>
    );
};

export default Spent;
