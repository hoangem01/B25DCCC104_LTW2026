import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = Number(id);
  const question = questions.find(q => q.id === numId);

  if (!question) {
    return <div>Không tìm thấy câu hỏi</div>;
  }

  const prevQuestion = questions.find(q => q.id === numId - 1);
  const nextQuestion = questions.find(q => q.id === numId + 1);

  return (
    <div>
      <h3>Câu hỏi số {question.id} ({LEVELS[question.level]} - {POINTS[question.level]} điểm)</h3>
      <p>{question.question}</p>
      <div>
        {question.options.map((opt, index) => (
          <div key={index} style={{ backgroundColor: index === question.answer ? 'lightgreen' : 'transparent' }}>
            {LETTERS[index]}. {opt} {index === question.answer && '(Đáp án đúng)'}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
      <div>
        {prevQuestion && <Link to={`/questions/${prevQuestion.id}`}>Câu trước</Link>}
        {nextQuestion && <Link to={`/questions/${nextQuestion.id}`}>Câu sau</Link>}
      </div>
    </div>
  );
};
export default QuestionDetail;