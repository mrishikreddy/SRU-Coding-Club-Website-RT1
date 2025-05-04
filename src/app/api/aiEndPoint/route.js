import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { rawText } = await req.json();

    const CiaoData = `code hidden`;

    let tempVar = ""
    const prompt = CiaoData + `\n\nUser Query: ${rawText}`;
    const genAI = new process.env.Key1;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    tempVar = result.response.text()
    

    const text = tempVar.replace(/\*/g, " "); 

    return new Response(
      JSON.stringify({ response: text }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(
      JSON.stringify({
        response: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}