"use server";

import { connect } from "../mongodb/mongoose";
import Attempt from "../models/attemptModel";
const Groq = require("groq-sdk");

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Function to evaluate answer using AI
export const evaluateQuestAnswer = async (questData, userAnswer, questionData) => {
  try {
    const prompt = `
    As an expert programming evaluator, assess the following answer for a programming quest.
    
    Question Type: ${questionData.type}
    Question Title: ${questionData.title}
    Question Description: ${questionData.description}
    ${questionData.testCases?.length > 0 ? `Test Cases:
    ${questionData.testCases.map(tc => `Input: ${tc.input}
    Expected Output: ${tc.expectedOutput}`).join('\n')}` : ''}
    Maximum Points: ${questionData.points}
    
    User's Answer: ${userAnswer}
    
    Evaluate the answer and provide feedback in the following JSON format:
    {
      "score": <number between 0 and ${questionData.points}>,
      "correctness": "<'Fully Correct' or 'Partially Correct' or 'Incorrect'>",
      "feedback": "<detailed explanation of what was good and what was wrong>",
      "improvements": ["<specific suggestion 1>", "<specific suggestion 2>", ...],
      "testCasesPassed": <number of test cases passed, if applicable>
    }
    
    Base your evaluation on:
    1. Correctness of the solution
    2. Code quality and best practices
    3. Efficiency and optimization
    4. Clarity and readability
    5. Test cases passed (for coding questions)
    
    For coding questions, try to run the code against the test cases if possible.
    For short answer questions, evaluate based on technical accuracy and completeness.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert programming evaluator with extensive experience in assessing code quality and solutions. Focus on providing constructive feedback that helps the student improve.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
      temperature: 0.3,
      max_tokens: 1000,
      top_p: 0.8,
      stream: false,
      stop: null,
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);
    console.log("AI Evaluation:", aiResponse);
    
    return {
      score: aiResponse.score,
      feedback: `${aiResponse.correctness}\n\n${aiResponse.feedback}\n\nSuggested Improvements:\n${aiResponse.improvements.join('\n')}`,
      evaluatedAt: new Date()
    };

  } catch (error) {
    console.error("Error in AI evaluation:", error);
    return {
      score: 0,
      feedback: "Error occurred during evaluation. Please try again.",
      evaluatedAt: new Date()
    };
  }
};

// Function to submit and evaluate a quest attempt
export const submitQuestAttempt = async (attemptId, answers) => {
  try {
    await connect();
    
    const attempt = await Attempt.findById(attemptId).populate('questId');
    if (!attempt) {
      throw new Error('Attempt not found');
    }

    // Evaluate each answer individually
    const evaluations = await Promise.all(
      answers.map(async (answer) => {
        const question = attempt.questId.questions.find(
          q => q._id.toString() === answer.questionId
        );

        if (!question) {
          throw new Error(`Question not found for answer ${answer.questionId}`);
        }

        const evaluation = await evaluateQuestAnswer(attempt.questId, answer.answer, question);
        return {
          questionId: answer.questionId,
          evaluation: {
            score: evaluation.score,
            feedback: evaluation.feedback,
            evaluatedAt: evaluation.evaluatedAt
          }
        };
      })
    );

    // Calculate total score
    const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.evaluation.score, 0);

    return {
      success: true,
      evaluations,
      totalScore
    };

  } catch (error) {
    console.error("Error in submitQuestAttempt:", error);
    throw error;
  }
};
