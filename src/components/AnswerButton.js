import { LETTERS } from '../data';

const AnswerButton = ({ index, option, onSelect, status, selectedAnswer, correctAnswer }) => {
  let bgColor = 'transparent';
  
  if (status === 'locked' && selectedAnswer === index) {
    bgColor = 'yellow';
  } else if (status === 'revealed') {
    if (index === correctAnswer) bgColor = 'lightgreen';
    else if (selectedAnswer === index) bgColor = 'red';
  }

  return (
    <button 
      style={{ backgroundColor: bgColor, margin: '5px', padding: '10px' }} 
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
    >
      {LETTERS[index]}. {option}
    </button>
  );
};
export default AnswerButton;