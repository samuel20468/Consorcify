import { IConsortium } from "@/Interfaces/Interfaces";

// Creación de consorcios
export async function consortiumFetch(consortiumData: IConsortium) {
    console.log(consortiumData);

    try {
        const response = await fetch(`http://localhost:3001/consortiums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(consortiumData),
        });

        if (!response.ok) {
            return response.json().then((errorInfo) => {
                throw new Error(`
                    Error ${response.status}: ${
                    errorInfo.message || response.statusText
                }
               `);
            });
        }
        return response;

        // Definir que vamos a mostrar una vez creado el consorcio
    } catch (error: any) {
        throw new Error(error);
    }
}

// Pedidos de consorcios
