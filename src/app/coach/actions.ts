'use server';

import { getPersonalizedTips, type PersonalizedTipsInput, type PersonalizedTipsOutput } from '@/ai/flows/personalized-tips';

export async function getPersonalizedTipsAction(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  // In a real app, you would add validation and user authentication here.
  try {
    const tips = await getPersonalizedTips(input);
    return tips;
  } catch (error) {
    console.error('Error getting personalized tips:', error);
    // You can customize the error object to be more client-friendly
    throw new Error('Failed to generate tips from AI model.');
  }
}
