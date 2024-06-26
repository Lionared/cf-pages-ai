
export async function sendGPT(inputText: string): Promise<ReadableStream<Uint8Array> | null> {
    const url: string = process.env.API_CHAT ? process.env.API_CHAT : '';
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            message: inputText,
        }),
        // mode: "no-cors",
    })
    console.log(response);
    if (response.ok) {
        return response.body;
    }
    throw new Error("Failed to send GPT");
}