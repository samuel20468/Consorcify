"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../ui";
import { IConsortium, INewExpense } from "@/Interfaces/Interfaces";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { getConsortiums, newExpense } from "@/helpers/fetch.helper";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentDate } from "@/helpers/functions.helper";
import { validateForm } from "@/helpers/Validations/vallidate.expense";
import Swal from "sweetalert2";
import Link from "next/link";

const addExpenses = () => {
    useAuth();
    const path = usePathname();
    const router = useRouter();
    const { token, data } = useSesion();
    const initialData = {
        issue_date: getCurrentDate(),
        expiration_date: "",
        consortium_id: "",
        name: "",
    };
    const [expense, setExpense] = useState<INewExpense>(initialData);
    const [errors, setErrors] = useState<INewExpense>(initialData);
    const [consortiums, setconsortiums] = useState<IConsortium[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
                if (response) {
                    const data = await response.json();
                    setconsortiums(data);
                }
            } catch (error) {}
        };
        if (token) {
            fetchData();
        }
    }, [token, path]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!expense.expiration_date || !expense.consortium_id) {
            Swal.fire({
                icon: "error",
                title: "Por favor completa todos los campos",
            });
            return;
        }

        try {
            const response = await newExpense(token, expense);
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Expensa creada correctamente",
                }).then((resp) => {
                    if (resp.isConfirmed) {
                        router.push("/dashboard/admin/expenses");
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Hubo error al crear la Expensa",
                            text: "Intentato mas trade",
                        });
                        return;
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const errors = validateForm(expense);
        setErrors(errors);
    }, [expense]);

    console.log(expense);

    return (
        <div className="flex flex-col w-full items-center justify-center p-8 h-1/2">
            <div className="w-1/2 flex justify-end">
                <Link href="/dashboard/admin/expenses/">
                    <Button className="w-32 py-2 rounded-[40px]">Atrás</Button>
                </Link>
            </div>
            <div className="p-3">
                <h3 className="text-2xl text-black">Nueva Expensa</h3>
            </div>
            <form
                className="w-1/2 flex flex-col items-center justify-between h-full  p-8 rounded-[40px] border border-black"
                onSubmit={handleSubmit}
            >
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between">
                        <Label className="w-full text-black">
                            Nombre de expensa:
                        </Label>
                    </div>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={expense.name}
                        onChange={handleChange}
                    />
                    <div className="w-full flex justify-between">
                        <Label className="w-full text-black">
                            Fecha de Vencimiento
                        </Label>
                        {errors.expiration_date && (
                            <span className="w-full flex items-center justify-center">
                                {errors.expiration_date}
                            </span>
                        )}
                    </div>
                    <Input
                        type="date"
                        name="expiration_date"
                        id="expiration_date"
                        min={getCurrentDate()}
                        value={expense.expiration_date}
                        onChange={handleChange}
                    />
                    <div className="w-full flex flex-col">
                        <Label className="w-full text-black">Consorcio</Label>
                        <select
                            value={expense.consortium_id}
                            onChange={handleChange}
                            name="consortium_id"
                            id="consortium_id"
                            defaultValue=""
                            className="w-full h-10 p-2 my-1 text-gray-200 rounded-md shadow-xl bg-input placeholder:font-extralight placeholder:text-gray-500 focus:outline-none no-spinners"
                        >
                            <option value="" disabled>
                                Elija un Consorcio
                            </option>
                            {consortiums.length !== 0 &&
                                consortiums.map((consortium) => (
                                    <option
                                        key={consortium.id}
                                        value={consortium.id}
                                    >
                                        {consortium.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <Button
                        type="submit"
                        className="w-full py-2 rounded-[40px]"
                    >
                        Crear Expensa
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default addExpenses;
