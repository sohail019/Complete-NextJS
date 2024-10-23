import { GoogleGenerativeAI } from "@google/generative-ai";

// Function to filter out values starting with '>'
function filterOutValuesStartingWithGreaterThan(arr: string[]): string[] {
  return arr.filter((value) => value.startsWith('>'));
}

export async function POST(request: Request) {
  try {
    //* Use environment variable for the API key
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GEMINI_API_KEY as string
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flush" });

    const prompt =
      "Get 3 new message suggestions for the writer to write message in the true feedback application. The application is used to send anonymous suggestions to another username. This message can be anything. Use a formal tone for the messages.";

    //* Generate content using AI model
    const result = await model.generateContent(prompt);

    //* Check the response type and extract text
    const text = result.response.text();
    console.log(typeof result.response);

    //* Split the text into messages
    const messages = text.trim().split("\n\n");
    const trimmedMessage = filterOutValuesStartingWithGreaterThan(messages);

    //* Create an array of suggested messages by removing '>'
    const suggestedMessages = trimmedMessage.map((msg) =>
      msg.replace(">", "").trim()
    );

    console.log(suggestedMessages);

    // Return the suggested messages in the response
    return Response.json(
      {
        success: true,
        suggestedMessages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);

    //! Return a generic error message with a 500 status
    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
