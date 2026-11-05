import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => {
  return (
    <div>
      <div style={{ color: timeLeft <= 15 ? 'red' : 'black' }}>
        Thời gian: {timeLeft} giây
      </div>
      <div>
        Mạng: {lives} {Array.from({ length: lives }).map((_, i) => <span key={i}>❤️</span>)}
      </div>
      <div>Điểm: {formatScore(score)}</div>
      <div>Chuỗi đúng: {streak}</div>
    </div>
  );
};
export default StatusBar;