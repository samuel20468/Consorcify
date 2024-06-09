"use client";

// Estilos y contenedores
import { ContainerDashboard, Title } from "@/components/ui";

// Endpoints
import { getConsortiumById } from "@/helpers/fetch.helper";

// Interfaces
import { IConsortium } from "@/Interfaces/Interfaces";

// Hooks
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/helpers/useAuth";
import useSesion from "@/helpers/useSesion";

// --------------------

const ConsortiumId = () => {
    useAuth();
    const { token } = useSesion();
    const pathname = usePathname();
    const params: { id: string } = useParams();
    const [consortium, setConsortium] = useState<IConsortium>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getConsortiumById(params.id, token);
                if (response) {
                    setConsortium(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token, pathname]);

    return (
        <div className="h-screen text-white">
            <ContainerDashboard>
                <Title>
                    Consorcios{" "}
                    <span className="text-xl font-thin">
                        | {consortium?.name}
                    </span>
                </Title>
                <h1>aca van los detalles del consorcio: {consortium?.name}</h1>
            </ContainerDashboard>
        </div>
    );
};

export default ConsortiumId;
