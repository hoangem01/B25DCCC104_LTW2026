import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, score, correctCount, livesLeft, reason } = location.state;

  let message = '';
  if (reason === 'perfect') message = 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu';
  else if (reason === 'finished') message = 'Bạn đã hoàn thành thử thách';
  else if (reason === 'no_lives') message = 'Bạn đã hết mạng';
  else if (reason === 'timeout') message = 'Hết giờ!';

  return (
    <div>
      <h2>{message}</h2>
      <p>Người chơi: {playerName}</p>
      <p>Số câu trả lời đúng: {correctCount}</p>
      <p>Số mạng còn lại: {livesLeft}</p>
      <p>Điểm: {formatScore(score)}</p>
      <button onClick={() => navigate('/play')}>Chơi lại</button>
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
};
export default Result;