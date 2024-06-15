"use client";
import { IFunctionalUnitExpenses } from "@/Interfaces/functionalUnits.interfaces";
import { Button, ContainerDashboard, Input, Title } from "@/components/ui";
import { paymentCheckOut } from "@/helpers/fetch.helper";
import { functionalUnitExpensesId } from "@/helpers/fetch.helper.uf";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ExpensesUnitId = () => {
    useAuth();
    const { token, data } = useSesion();
    const { id }: { id: string } = useParams();
    const [expense, setExpense] = useState<IFunctionalUnitExpenses>();
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        const fechtExpenses = async () => {
            try {
                const response = await functionalUnitExpensesId(id!, token);
                if (response) {
                    setExpense(response);
                    setAmount(response.total_amount);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Error al obtener la unidad funcional",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fechtExpenses();
        }
    }, [token]);

    const handlePay = async () => {
        try {
            const response = await paymentCheckOut(token, id, amount);
            if (response?.ok) {
                const { url } = await response.json();
                window.location.href = url;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "") {
            setAmount(0);
        } else {
            setAmount(parseFloat(value));
        }
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <Title>Pagar - </Title>
            <div className="w-[90%] flex justify-end my-2 mt-0">
                <Link href="/dashboard/usuario/expenses">
                    <Button className="w-32 py-2 rounded-[40px]">Volver</Button>
                </Link>
            </div>
            <div className="w-full h-[50%] border rounded-[40px] flex flex-col items-center justify-center p-3">
                <div className="font-bold text-2xl my-3">Resumen</div>
                <div className="flex flex-col border w-[50%] p-5 gap-2 rounded-[40px] px-10">
                    <div className="w-full flex justify-evenly">
                        <p className="flex justify-start w-full">
                            Saldo anterior:
                        </p>
                        <p>${expense?.previous_balance}</p>
                    </div>
                    <div className="w-full flex justify-evenly">
                        <p className="flex justify-start w-full">
                            Intereses totales:
                        </p>
                        <p>${expense?.interests}</p>
                    </div>
                    <div className="w-full flex justify-evenly">
                        <p className="flex justify-start w-full">
                            Gastos del mes:
                        </p>
                        <p>${expense?.monthly_expenditure}</p>
                    </div>
                    <div className="w-full border-b"></div>
                    <div className="w-full flex justify-evenly">
                        <p className="flex justify-start w-full">Total:</p>
                        <p>${expense?.total_amount}</p>
                    </div>
                </div>
                <div className="w-[50%] py-2 flex justify-evenly">
                    <div className="flex items-center justify-center gap-2">
                        Monto-${" "}
                        <Input
                            type="number"
                            id="amoount"
                            name="amount"
                            value={amount === 0 ? "" : amount}
                            step="0.01"
                            onChange={handleChange}
                        />
                    </div>
                    <Link href="">
                        <Button
                            className="w-32 py-2 rounded-[40px]"
                            onClick={handlePay}
                        >
                            Pagar
                        </Button>
                    </Link>
                </div>
            </div>
        </ContainerDashboard>
    );
};

export default ExpensesUnitId;