import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';

const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (status !== 'answering') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (timeLeft === 0 && status === 'answering') {
      const finalScore = calcScore(results, questions);
      const correctCount = results.filter(r => r === 'correct').length;
      navigate('/result', {
        replace: true,
        state: { playerName, score: finalScore.score, correctCount, livesLeft: lives, reason: 'timeout' }
      });
    }
  }, [timeLeft, status, results, questions, lives, navigate, playerName]);

  useEffect(() => {
    let timeout;
    if (status === 'locked') {
      timeout = setTimeout(() => setStatus('revealed'), 1000);
    } else if (status === 'revealed') {
      timeout = setTimeout(() => {
        const isCorrect = selectedAnswer === questions[currentIndex].answer;
        const newResults = [...results, isCorrect ? 'correct' : 'wrong'];
        const newLives = isCorrect ? lives : lives - 1;
        
        setResults(newResults);
        setLives(newLives);

        if (newLives === 0) {
          const finalScore = calcScore(newResults, questions);
          const correctCount = newResults.filter(r => r === 'correct').length;
          navigate('/result', {
            replace: true,
            state: { playerName, score: finalScore.score, correctCount, livesLeft: 0, reason: 'no_lives' }
          });
        } else if (currentIndex === 14) {
          const finalScore = calcScore(newResults, questions);
          const correctCount = newResults.filter(r => r === 'correct').length;
          const reason = correctCount === 15 ? 'perfect' : 'finished';
          navigate('/result', {
            replace: true,
            state: { playerName, score: finalScore.score, correctCount, livesLeft: newLives, reason }
          });
        } else {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setStatus('answering');
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [status, selectedAnswer, currentIndex, questions, results, lives, navigate, playerName]);

  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  if (questions.length === 0) return <div>Đang tải dữ liệu...</div>;

  const currentQuestion = questions[currentIndex];
  const scoreData = calcScore(results, questions);

  const handleSelect = (index) => {
    setSelectedAnswer(index);
    setStatus('locked');
  };

  return (
    <div>
      <StatusBar 
        timeLeft={timeLeft} 
        lives={lives} 
        score={scoreData.score} 
        streak={scoreData.streak} 
      />
      <ProgressBar results={results} currentIndex={currentIndex} />
      <QuestionCard 
        question={currentQuestion}
        currentIndex={currentIndex}
        onSelect={handleSelect}
        status={status}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
};
export default Play;