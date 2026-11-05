import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredQuestions = questions.filter(q => {
    const matchLevel = level === 'All' || q.level.toString() === level;
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  const handleRandom = () => {
    if (filteredQuestions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    navigate(`/questions/${filteredQuestions[randomIndex].id}`);
  };

  return (
    <div>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="All">Tất cả</option>
        <option value="1">Dễ</option>
        <option value="2">Trung bình</option>
        <option value="3">Khó</option>
      </select>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>Có {filteredQuestions.length} câu hỏi</div>
      <button onClick={handleRandom} disabled={filteredQuestions.length === 0}>Câu ngẫu nhiên</button>
      
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{formatScore(POINTS[q.level])}</td>
              <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default QuestionBank;