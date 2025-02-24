export const AnamneseService = {

    async generator(payload, status) {
        try {
            const response = await fetch('http://localhost:8000/api/generate-document', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    conversation: payload,
                    status: status
                })
            })

            const data = await response.json();
            return data.content;
        } catch (error) {
            console.error(error);
        }
    }

}