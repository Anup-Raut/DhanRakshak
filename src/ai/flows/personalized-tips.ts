'use server';

/**
 * @fileOverview Personalized financial tips flow.
 *
 * - getPersonalizedTips - A function that returns personalized financial tips based on user data.
 * - PersonalizedTipsInput - The input type for the getPersonalizedTips function.
 * - PersonalizedTipsOutput - The return type for the getPersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipsInputSchema = z.object({
  age: z.number().describe('The user\'s age.'),
  income: z.number().describe('The user\'s annual income.'),
  financialGoals: z
    .string()
    .describe('The user\'s financial goals, such as retirement, buying a house, etc.'),
});
export type PersonalizedTipsInput = z.infer<typeof PersonalizedTipsInputSchema>;

const PersonalizedTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized financial tips.'),
});
export type PersonalizedTipsOutput = z.infer<typeof PersonalizedTipsOutputSchema>;

export async function getPersonalizedTips(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  return personalizedTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTipsPrompt',
  input: {schema: PersonalizedTipsInputSchema},
  output: {schema: PersonalizedTipsOutputSchema},
  prompt: `You are a personal finance expert. Based on the user's age, income, and financial goals, provide personalized financial tips.

Age: {{{age}}}
Income: {{{income}}}
Financial Goals: {{{financialGoals}}}

Here are some tips:
`, // Keep the tips key, it's important for parsing the output
});

const personalizedTipsFlow = ai.defineFlow(
  {
    name: 'personalizedTipsFlow',
    inputSchema: PersonalizedTipsInputSchema,
    outputSchema: PersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
