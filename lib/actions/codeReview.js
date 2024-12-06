"use server"

const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});


export const generateReview = async (code, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Generating AI review...`);
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Provide an in-depth code review as if you have 15 years of experience in computer science and IT. Kindly refuse to answer questions unrelated to the domain(this is a MUST). You have to provide feedback based on the code. For related questions, Offer explanations, code examples, and best practices similar to a StackOverflow response.",
            },
            {
              role: "user",
              content: `${code}`,
            },
          ],
          model: "llama3-groq-70b-8192-tool-use-preview",
          temperature: 0.5,
          max_tokens: 800,
          top_p: 0.65,
          stream: false,
          stop: null,
        });
  
        const aiResponse = chatCompletion.choices[0].message.content || "";
        console.log("AI Review Generated Successfully:");
        console.log(aiResponse);
        return aiResponse;
      } catch (error) {
        console.error(`Attempt ${attempt} - Error generating AI answer:`, error.message);
        if (attempt === retries) {
          console.error("Max retries reached. Failed to generate AI answer.");
          return "An error occurred while generating the AI response after multiple attempts.";
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Assuming a delay of 1 second between retries
      }
    }
  };
