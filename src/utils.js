import { POINTS, STREAK_BONUS } from './data';

export const calcScore = (results, questions) => {
  return results.reduce((acc, result, index) => {
    if (result === 'correct') {
      const newStreak = acc.streak + 1;
      const bonus = newStreak >= 3 ? STREAK_BONUS : 0;
      return {
        score: acc.score + POINTS[questions[index].level] + bonus,
        streak: newStreak
      };
    }
    return {
      ...acc,
      streak: 0
    };
  }, { score: 0, streak: 0 });
};