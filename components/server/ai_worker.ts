const API_URL = process.env.NEXT_PUBLIC_API_CHAT as string;

if (!API_URL) {
  throw new Error('Missing API URL');
}

export async function sendGPT(
  inputText: string
): Promise<ReadableStream<Uint8Array> | null> {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      message: inputText,
    }),
    // mode: "no-cors",
  });

  if (response.ok) {
    return response.body;
  }
  throw new Error("Failed to send GPT");
}
