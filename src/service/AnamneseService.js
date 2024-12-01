export const AnamneseService = {

    async generator(payload) {
        try {
            const response = await fetch('http://localhost:8000/api/generate-anamnese', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({anamnese: payload})
            })

            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error(error);
        }
    }

}