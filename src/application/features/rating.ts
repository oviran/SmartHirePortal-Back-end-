//@ts-nocheck 
import OpenAI from "openai";
import JobApplication from "../../persistance/entities/JobApplication";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRating(jobApplicationId) {

    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");    // it can get specific things
    const content = `Role: ${jobApplication.job.title}, User Drescription: ${jobApplication.answers.join(" ")}`  //join - use adding together 

    const completion = await client.chat.completions.create({
        messages: [{ role: "user", content }],
        model: "ft:gpt-3.5-turbo-0613:stemlink:fullstacktutorial:8dWQ9vUC",
    });

    const response = JSON.parse(completion.choices[0].message.content);
    console.log(response);
    if (!response.rate) {
        return;
    }
    await JobApplication.findOneAndUpdate({ _id: jobApplicationId }, { rating: response.rate })

}