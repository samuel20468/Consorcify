"use client";

// Estilos y componentes
import { Button, ContainerDashboard, Input, Label } from "@/components/ui";

// Endpoints
import { getUserById, updateUser } from "@/helpers/fetch.helper.user";

// Interfaces
import { IRegister, IRegisterError } from "@/Interfaces/user.interfaces";

// Hooks
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";
import { areFieldsNotEmpty } from "@/helpers/Validations/validate.empty";
import Swal from "sweetalert2";

// -------------------------

const UpdateUser = () => {
    useAuth();
    const { token, data } = useSesion();
    const path = usePathname();
    const router = useRouter();

    const initialData = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState<IRegister>(initialData);
    const [errors, setErrors] = useState<IRegisterError>(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(data.id, token);
                if (response?.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token, path, data.id]);
    console.log(userData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!areFieldsNotEmpty(userData)) {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos.",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Ok",
            });
        }

        try {
            const response = await updateUser(userData, data.id, token);
            if (response?.ok) {
                Swal.fire({
                    title: "Cambios guardados",
                    text: "Tu perfil ha sido actualizado correctamente",
                    icon: "success",
                    confirmButtonColor: "#0b0c0d",
                }).then((res) => {
                    if (res.isConfirmed) {
                        router.push("/dashboard/profile");
                    }
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al actualizar tu perfil",
                    icon: "error",
                    confirmButtonColor: "#0b0c0d",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUserData(initialData);
        setErrors(initialData);
        router.push("/dashboard/profile");
    };

    return (
        <ContainerDashboard className="w-[90%] h-[90vh]">
            <div className="self-start mt-2 text-2xl">Modificar Datos</div>
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
                <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col w-1/2 h-[70%] border justify-between rounded-[40px] p-8 gap-3"
                >
                    <div className="flex justify-end w-full">
                        <Button
                            onClick={handleBack}
                            className="py-2 w-24 rounded-[40px]"
                        >
                            Atras
                        </Button>
                    </div>
                    <div>
                        <Label>Nombre:</Label>
                        <Input
                            type="text"
                            name="first_name"
                            value={userData?.first_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Apellido:</Label>
                        <Input
                            type="text"
                            name="last_name"
                            value={userData?.last_name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />

                        <Label>Email:</Label>
                        <Input
                            type="text"
                            name="email"
                            value={userData?.email}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-full">
                        <Button
                            type="submit"
                            className="w-full py-2 rounded-[40px]"
                        >
                            Confirmar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </ContainerDashboard>
    );
};

export default UpdateUser;
