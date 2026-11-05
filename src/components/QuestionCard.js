import AnswerButton from './AnswerButton';
import { LEVELS, POINTS } from '../data';

const QuestionCard = ({ question, currentIndex, onSelect, status, selectedAnswer, hiddenOptions }) => {
  return (
    <div>
      <h3>Câu {currentIndex + 1}/15 - {LEVELS[question.level]} - {POINTS[question.level]} điểm</h3>
      <p style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>{question.question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {question.options.map((opt, idx) => (
          <AnswerButton 
            key={idx}
            index={idx}
            option={opt}
            onSelect={onSelect}
            status={status}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.answer}
            isHidden={hiddenOptions.includes(idx)}
          />
        ))}
      </div>
    </div>
  );
};
export default QuestionCard;