import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import Helpers from '../components/Helpers';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';

const Play = ({ playerName, questions, addHistory }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [used5050, setUsed5050] = useState(false);
  const [usedSkip, setUsedSkip] = useState(false);
  const [usedAddLife, setUsedAddLife] = useState(false);

  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 - còn ${lives} mạng`;
    return () => {
      document.title = 'Thử thách 3 mạng';
    };
  }, [currentIndex, lives]);

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

  const finishGame = useCallback((finalResults, finalLives, reason) => {
    const finalScore = calcScore(finalResults, questions);
    const correctCount = finalResults.filter(r => r === 'correct').length;
    addHistory({
      id: Date.now(),
      name: playerName,
      score: finalScore.score,
      correctCount,
      livesLeft: finalLives,
      playedAt: new Date().toLocaleString("vi-VN")
    });
    navigate('/result', {
      replace: true,
      state: { playerName, score: finalScore.score, correctCount, livesLeft: finalLives, reason }
    });
  }, [addHistory, navigate, playerName, questions]);

  useEffect(() => {
    if (timeLeft === 0 && status === 'answering') {
      finishGame(results, lives, 'timeout');
    }
  }, [timeLeft, status, results, lives, finishGame]);

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
          finishGame(newResults, 0, 'no_lives');
        } else if (currentIndex === 14) {
          const correctCount = newResults.filter(r => r === 'correct').length;
          finishGame(newResults, newLives, correctCount === 15 ? 'perfect' : 'finished');
        } else {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setHiddenOptions([]);
          setStatus('answering');
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [status, selectedAnswer, currentIndex, questions, results, lives, finishGame]);

  const handleSelect = useCallback((index) => {
    if (status !== 'answering' || hiddenOptions.includes(index)) return;
    setSelectedAnswer(index);
    setStatus('locked');
  }, [status, hiddenOptions]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'answering') return;
      const key = e.key.toLowerCase();
      const map = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
      if (map[key] !== undefined) {
        handleSelect(map[key]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, handleSelect]);

  if (!playerName) return <Navigate to="/" replace />;
  if (questions.length === 0) return <div>Đang tải dữ liệu...</div>;

  const currentQuestion = questions[currentIndex];
  const scoreData = calcScore(results, questions);

  const handle5050 = () => {
    setUsed5050(true);
    const incorrects = [0, 1, 2, 3].filter(i => i !== currentQuestion.answer);
    const hidden = [];
    while (hidden.length < 2) {
      const rand = incorrects[Math.floor(Math.random() * incorrects.length)];
      if (!hidden.includes(rand)) hidden.push(rand);
    }
    setHiddenOptions(hidden);
  };

  const handleSkip = () => {
    setUsedSkip(true);
    const newResults = [...results, 'skipped'];
    setResults(newResults);
    if (currentIndex === 14) {
      const correctCount = newResults.filter(r => r === 'correct').length;
      finishGame(newResults, lives, correctCount === 15 ? 'perfect' : 'finished');
    } else {
      setCurrentIndex(prev => prev + 1);
      setHiddenOptions([]);
      setStatus('answering');
    }
  };

  const handleAddLife = () => {
    setUsedAddLife(true);
    setLives(prev => Math.min(prev + 1, MAX_LIVES));
  };

  return (
    <div>
      <StatusBar timeLeft={timeLeft} lives={lives} score={scoreData.score} streak={scoreData.streak} />
      <ProgressBar results={results} currentIndex={currentIndex} />
      <QuestionCard 
        question={currentQuestion}
        currentIndex={currentIndex}
        onSelect={handleSelect}
        status={status}
        selectedAnswer={selectedAnswer}
        hiddenOptions={hiddenOptions}
      />
      <Helpers 
        status={status}
        lives={lives}
        used5050={used5050}
        usedSkip={usedSkip}
        usedAddLife={usedAddLife}
        on5050={handle5050}
        onSkip={handleSkip}
        onAddLife={handleAddLife}
      />
    </div>
  );
};
export default Play;