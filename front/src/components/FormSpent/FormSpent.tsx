// Estilos y componentes
import { Button, Input, Label, Select } from "../ui";
import Swal from "sweetalert2";

// Interfaces
import {
    IConsortium,
    IExpenditures,
    IExpense,
    ISuppliers,
} from "@/Interfaces/Interfaces";

// Endpoints
import {
    expenditureFetch,
    getConsortiums,
    getExpenses,
    getSuppliers,
} from "@/helpers/fetch.helper";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// -------------------

const FormSpent = () => {
    useAuth();
    const { token } = useSesion();
    const pathname = usePathname();
    const router = useRouter();
    const initialData = {
        date: "",
        total_amount: 0,
        category: "",
        invoice_number: "",
        description: "",
        expense_id: "",
        supplier_id: "",
        consortium_id: "",
    };
    const [registerExpenditure, setRegisterExpenditure] =
        useState<IExpenditures>(initialData);
    const [consortiums, setConsortiums] = useState<IConsortium[]>([]);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiums(token);
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
                const response = await getExpenses(token);
                if (response) {
                    const data = await response.json();
                    setExpenses(data);
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setRegisterExpenditure((prevState) => ({
            ...prevState,
            [name]: name === "total_amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !registerExpenditure.date ||
            !registerExpenditure.consortium_id ||
            !registerExpenditure.expense_id ||
            !registerExpenditure.category ||
            !registerExpenditure.invoice_number ||
            !registerExpenditure.total_amount ||
            !registerExpenditure.supplier_id ||
            !registerExpenditure.description
        ) {
            Swal.fire({
                icon: "error",
                title: "Por favor completa todos los campos",
            });
            return;
        }
        try {
            const response = await expenditureFetch(token, registerExpenditure);
            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Gasto creado correctamente",
                }).then((response) => {
                    if (response.isConfirmed) {
                        router.push("/dashboard/admin/spent");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error al crear el gasto",
                        });
                        return;
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo crear el gasto",
            });
        }
    };

    return (
        <div className="w-[80%] flex flex-col justify-center bg-[#d3d3d3] p-5 rounded-[50px] text-black">
            <h1 className="mb-4 text-3xl text-center">
                Este es el formulario de gastos
            </h1>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="date">
                            Fecha:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="date"
                            name="date"
                            value={registerExpenditure.date}
                            type="date"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="consortium_id">
                            Consorcio:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="consortium_id"
                            name="consortium_id"
                            value={registerExpenditure.consortium_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar el consorcio
                            </option>
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
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="expense_id">
                            Expensa:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="expense_id"
                            name="expense_id"
                            value={registerExpenditure.expense_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar la expensa
                            </option>
                            {expenses.length > 0 &&
                                expenses.map((expense) => (
                                    <option value={expense.id} key={expense.id}>
                                        {expense.id}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="category">
                            Categoria:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="category"
                            name="category"
                            value={registerExpenditure.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar la categoría
                            </option>
                            <option value="Servicios Públicos">
                                Servicios Públicos
                            </option>
                            <option value="Abono de Servicios">
                                Abono de Servicios
                            </option>
                            <option value="Mantenimiento de partes comunes">
                                Mantenimiento de partes comunes
                            </option>
                            <option value="Gastos Bancarios">
                                Gastos Bancarios
                            </option>
                            <option value="Gastos de limpieza">
                                Gastos de limpieza
                            </option>
                            <option value="Gastos administrativos">
                                Gastos administrativos
                            </option>
                            <option value="Seguro">Seguro</option>
                            <option value="Sueldos">Sueldos</option>
                            <option value="Otros">Otros</option>
                        </Select>
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="invoice_number">
                            Numero de factura:
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="invoice_number"
                            name="invoice_number"
                            value={registerExpenditure.invoice_number}
                            type="number"
                            onChange={handleChange}
                            placeholder="0000-5678912"
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <Label htmlFor="total_amount">
                            Total:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="total_amount"
                            name="total_amount"
                            value={registerExpenditure.total_amount}
                            type="number"
                            onChange={handleChange}
                            placeholder="$400.000"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="supplier_id">
                            Proveedor:<span className="text-red-600">*</span>
                        </Label>
                        <Select
                            id="supplier_id"
                            name="supplier_id"
                            value={registerExpenditure.supplier_id}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccionar el proveedor
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
                    <div className="flex flex-col w-2/4">
                        <Label htmlFor="description">
                            Descripción:<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            value={registerExpenditure.description}
                            type="text"
                            onChange={handleChange}
                            placeholder="Descripción del servicio prestado"
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full mt-4">
                    <Button className="w-1/4 rounded-[50px] py-2">
                        Guardar gastos
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormSpent;
