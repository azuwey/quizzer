export const BCRYPT = {
  ROUNDS: 12,
};

export const JWT = {
  SECRET: process.env.JWT_SECRET ?? 'default',
};

export const QUIZ = {
  UNSELECTED_ANSWER: '000000000000000000000000',
};
