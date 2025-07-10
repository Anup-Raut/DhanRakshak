export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type TutorialContent = {
  title: string;
  body: string;
};

type TutorialTopic = {
  title: string;
  description: string;
  content: TutorialContent[];
  quiz: Question[];
};

export const tutorialData: Record<string, TutorialTopic> = {
  budgeting: {
    title: 'Budgeting 101',
    description: 'Master the art of creating and sticking to a budget to achieve your financial goals.',
    content: [
      {
        title: 'What is a Budget?',
        body: 'A budget is a plan for your money. It helps you track your income (money you earn) and expenses (money you spend) over a period, typically a month. The goal is to ensure you don\'t spend more than you earn and can save for your goals.',
      },
      {
        title: 'The 50/30/20 Rule',
        body: 'A popular budgeting guideline is the 50/30/20 rule. It suggests allocating 50% of your after-tax income to Needs (housing, groceries, utilities), 30% to Wants (dining out, entertainment), and 20% to Savings and Debt Repayment.',
      },
      {
        title: 'How to Track Expenses',
        body: 'You can track expenses using various methods: simple pen and paper, a spreadsheet, or budgeting apps. The key is consistency. At the end of the month, categorize your spending to see where your money is going.',
      },
    ],
    quiz: [
      {
        question: 'What is the main purpose of a budget?',
        options: ['To limit all fun spending', 'To track income and expenses', 'To get a credit card'],
        correctAnswer: 'To track income and expenses',
      },
      {
        question: 'In the 50/30/20 rule, what does the 20% represent?',
        options: ['Needs', 'Wants', 'Savings & Debt Repayment'],
        correctAnswer: 'Savings & Debt Repayment',
      },
      {
        question: 'Which of the following is typically considered a "Need"?',
        options: ['Concert tickets', 'Rent or mortgage payment', 'A new video game'],
        correctAnswer: 'Rent or mortgage payment',
      },
      {
        question: 'An expense that can change from month to month, like groceries, is called a...',
        options: ['Fixed expense', 'Variable expense', 'Recurring expense'],
        correctAnswer: 'Variable expense',
      },
      {
        question: 'What is a good first step when you want to create a budget?',
        options: ['Guessing your spending', 'Tracking your income and expenses for a month', 'Cutting all subscriptions'],
        correctAnswer: 'Tracking your income and expenses for a month',
      },
      {
        question: 'What is an "emergency fund"?',
        options: ['Money for a vacation', 'Money set aside for unexpected costs', 'Your primary investment account'],
        correctAnswer: 'Money set aside for unexpected costs',
      },
      {
        question: 'In the 50/30/20 rule, what category does your monthly streaming service subscription fall into?',
        options: ['Needs', 'Wants', 'Savings'],
        correctAnswer: 'Wants',
      },
      {
        question: 'Why is it important to review your budget regularly?',
        options: ['It\'s not important', 'To adjust for changes in your life or goals', 'To impress your friends'],
        correctAnswer: 'To adjust for changes in your life or goals',
      },
      {
        question: 'An example of a fixed expense is:',
        options: ['Dining out', 'Gas for your car', 'Your monthly car payment'],
        correctAnswer: 'Your monthly car payment',
      },
      {
        question: 'What is the primary benefit of tracking your expenses?',
        options: ['It automatically makes you richer', 'It shows you exactly where your money is going', 'It is a requirement for opening a bank account'],
        correctAnswer: 'It shows you exactly where your money is going',
      },
    ],
  },
  investing: {
    title: 'Investing Basics',
    description: 'Learn the fundamental principles of investing to grow your wealth over time.',
    content: [
      {
        title: 'What is Investing?',
        body: 'Investing is the process of buying assets that are expected to increase in value over time and provide income. Unlike saving, investing involves taking on risk with the potential for higher returns. Common investments include stocks, bonds, and real estate.',
      },
      {
        title: 'Risk and Return',
        body: 'The principle of risk and return states that assets with higher potential returns come with higher risk. It\'s crucial to understand your risk tolerance before investing. Diversification, or spreading your investments across different assets, can help manage risk.',
      },
      {
        title: 'Compound Interest',
        body: 'Compound interest is the interest you earn on both your initial investment and the accumulated interest. Albert Einstein called it the "eighth wonder of the world." The earlier you start investing, the more time your money has to grow through compounding.',
      },
    ],
    quiz: [
      {
        question: 'What is diversification in investing?',
        options: ['Putting all money in one stock', 'Spreading investments across different assets', 'Only investing in bonds'],
        correctAnswer: 'Spreading investments across different assets',
      },
      {
        question: 'What is a key benefit of starting to invest early?',
        options: ['Higher risk', 'Guaranteed returns', 'The power of compound interest'],
        correctAnswer: 'The power of compound interest',
      },
      {
        question: 'What is a stock?',
        options: ['A loan to a company', 'A share of ownership in a company', 'A type of savings account'],
        correctAnswer: 'A share of ownership in a company',
      },
      {
        question: 'In investing, higher potential returns usually come with...',
        options: ['Lower risk', 'No risk', 'Higher risk'],
        correctAnswer: 'Higher risk',
      },
      {
        question: 'What is a bond?',
        options: ['A share of ownership in a government', 'A loan you make to a corporation or government', 'A type of high-risk stock'],
        correctAnswer: 'A loan you make to a corporation or government',
      },
      {
        question: 'What is a mutual fund?',
        options: ['A single high-performing stock', 'A fund that only invests in real estate', 'A pool of money from many investors to buy a variety of assets'],
        correctAnswer: 'A pool of money from many investors to buy a variety of assets',
      },
      {
        question: 'What is a "bull market"?',
        options: ['A market where prices are falling', 'A market where prices are rising', 'A market that is closed for the day'],
        correctAnswer: 'A market where prices are rising',
      },
      {
        question: 'Is past performance of an investment a guarantee of future returns?',
        options: ['Yes, always', 'No, it is not an indicator', 'Only for bonds'],
        correctAnswer: 'No, it is not an indicator',
      },
      {
        question: 'What does "risk tolerance" refer to?',
        options: ['Your ability to tolerate losing money on an investment', 'Your knowledge of the stock market', 'The amount of money you have'],
        correctAnswer: 'Your ability to tolerate losing money on an investment',
      },
      {
        question: 'What is the main advantage of compound interest?',
        options: ['It simplifies your tax returns', 'It guarantees you will never lose money', 'It allows your earnings to generate their own earnings'],
        correctAnswer: 'It allows your earnings to generate their own earnings',
      },
    ],
  },
  saving: {
    title: 'Super Savings',
    description: 'Discover effective strategies to build your savings and secure your financial future.',
    content: [
      {
        title: 'Pay Yourself First',
        body: 'This is a core savings principle. Before you pay bills or spend on anything else, set aside a portion of your income for savings. The easiest way to do this is to set up an automatic transfer from your checking account to your savings account each payday.',
      },
      {
        title: 'Set Specific Savings Goals',
        body: 'It\'s easier to save when you have a clear goal. Instead of "saving more," aim for a specific target, like "save $5,000 for a down payment in 2 years." This makes your goal tangible and helps you stay motivated.',
      },
      {
        title: 'High-Yield Savings Accounts',
        body: 'A high-yield savings account (HYSA) is a type of savings account that typically pays a much higher interest rate than a traditional savings account. Keeping your emergency fund or short-term savings in an HYSA can help your money grow faster.',
      },
    ],
    quiz: [
      {
        question: 'What does "Pay Yourself First" mean?',
        options: ['Buy yourself a treat', 'Prioritize saving before other expenses', 'Pay off your highest interest debt first'],
        correctAnswer: 'Prioritize saving before other expenses',
      },
      {
        question: 'Why is a High-Yield Savings Account a good choice for an emergency fund?',
        options: ['It has high fees', 'It offers a higher interest rate than traditional accounts', 'It is a type of stock investment'],
        correctAnswer: 'It offers a higher interest rate than traditional accounts',
      },
      {
        question: 'What is the benefit of automating your savings?',
        options: ['It makes saving a consistent habit', 'It is the only way to save money', 'It gives you lower interest rates'],
        correctAnswer: 'It makes saving a consistent habit',
      },
      {
        question: 'Having a specific savings goal helps you to...',
        options: ['Spend more money', 'Stay motivated and track progress', 'Ignore your budget'],
        correctAnswer: 'Stay motivated and track progress',
      },
      {
        question: 'An emergency fund should typically cover how many months of living expenses?',
        options: ['1 week', '1 year', '3-6 months'],
        correctAnswer: '3-6 months',
      },
      {
        question: 'What is the main difference between saving and investing?',
        options: ['There is no difference', 'Saving is for long-term goals, investing is for short-term', 'Saving is generally lower risk, while investing involves taking on risk for potential growth'],
        correctAnswer: 'Saving is generally lower risk, while investing involves taking on risk for potential growth',
      },
      {
        question: 'Which of these is a good example of a short-term savings goal?',
        options: ['Retirement in 30 years', 'Saving for a vacation next year', 'Buying a stock'],
        correctAnswer: 'Saving for a vacation next year',
      },
      {
        question: 'How can cutting small, regular expenses (like a daily coffee) impact your savings?',
        options: ['It has no impact', 'It can add up to a significant amount over time', 'It only works if you are rich'],
        correctAnswer: 'It can add up to a significant amount over time',
      },
      {
        question: 'Where is the best place to keep your emergency fund?',
        options: ['In a checking account', 'Under your mattress', 'In a separate, easily accessible savings account'],
        correctAnswer: 'In a separate, easily accessible savings account',
      },
      {
        question: 'What does "S.M.A.R.T." stand for in goal setting?',
        options: ['Simple, Measurable, Attainable, Relevant, Time-bound', 'Specific, Measurable, Achievable, Relevant, Time-bound', 'Specific, Meaningful, Action-oriented, Realistic, Timely'],
        correctAnswer: 'Specific, Measurable, Achievable, Relevant, Time-bound',
      },
    ],
  },
  'tax-planning': {
    title: 'Tax Planning',
    description: 'An introduction to tax planning to help you understand and potentially reduce your tax burden.',
    content: [
      {
        title: 'What is Tax Planning?',
        body: 'Tax planning is the analysis of a financial situation or plan to ensure that all elements work together to allow you to pay the lowest taxes possible. It involves understanding different types of taxes, deductions, and credits.',
      },
      {
        title: 'Tax Deductions vs. Tax Credits',
        body: 'A tax deduction reduces your taxable income, lowering your tax bill based on your tax bracket. A tax credit, on the other hand, directly reduces the amount of tax you owe, dollar-for-dollar. A credit is generally more valuable than a deduction of the same amount.',
      },
      {
        title: 'Retirement Accounts and Taxes',
        body: 'Contributing to tax-advantaged retirement accounts like a 401(k) or a traditional IRA can be a powerful tax-planning tool. Contributions to these accounts are often tax-deductible, reducing your taxable income for the year.',
      },
    ],
    quiz: [
      {
        question: 'Which is generally more valuable for reducing your tax bill?',
        options: ['A $100 tax deduction', 'A $100 tax credit', 'They are the same'],
        correctAnswer: 'A $100 tax credit',
      },
      {
        question: 'How can contributing to a traditional 401(k) help with taxes?',
        options: ['It increases your taxable income', 'It can reduce your taxable income', 'It has no effect on taxes'],
        correctAnswer: 'It can reduce your taxable income',
      },
      {
        question: 'What is a tax deduction?',
        options: ['A direct reduction of your tax bill', 'An amount that lowers your taxable income', 'Money the government gives you for fun'],
        correctAnswer: 'An amount that lowers your taxable income',
      },
      {
        question: 'What is your "taxable income"?',
        options: ['Your total salary before any deductions', 'The portion of your income that taxes are calculated on', 'The amount of your tax refund'],
        correctAnswer: 'The portion of your income that taxes are calculated on',
      },
      {
        question: 'Which of these is an example of a tax credit?',
        options: ['Student loan interest deduction', 'Child Tax Credit', '401(k) contribution'],
        correctAnswer: 'Child Tax Credit',
      },
      {
        question: 'When are taxes typically due in the United States?',
        options: ['December 31st', 'January 1st', 'April 15th'],
        correctAnswer: 'April 15th',
      },
      {
        question: 'What is a W-2 form?',
        options: ['A form you fill out to start a business', 'A form from your employer showing your annual wages and taxes withheld', 'A form for reporting investment income'],
        correctAnswer: 'A form from your employer showing your annual wages and taxes withheld',
      },
      {
        question: 'A Roth IRA is different from a Traditional IRA in that...',
        options: ['Contributions are pre-tax, and withdrawals are taxed', 'Contributions are post-tax, and qualified withdrawals are tax-free', 'There are no differences'],
        correctAnswer: 'Contributions are post-tax, and qualified withdrawals are tax-free',
      },
      {
        question: 'What is a capital gains tax?',
        options: ['A tax on your salary', 'A tax on the profit from selling an asset, like a stock', 'A tax on gifts you receive'],
        correctAnswer: 'A tax on the profit from selling an asset, like a stock',
      },
      {
        question: 'What is the standard deduction?',
        options: ['A fixed dollar amount that you can subtract from your income', 'A variable amount based on your investments', 'A credit for having a job'],
        correctAnswer: 'A fixed dollar amount that you can subtract from your income',
      },
    ],
  },
};
