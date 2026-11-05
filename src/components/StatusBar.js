import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => {
  return (
    <div>
      <div style={{ color: timeLeft <= 15 ? 'red' : 'black' ,margin: '12px 0', fontWeight: '600' }}>
        Thời gian: {timeLeft} giây
      </div>
      <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>
        Mạng: {lives} {Array.from({ length: lives }).map((_, i) => <span key={i}>❤️</span>)}
      </div>
      <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>Điểm: {formatScore(score)}</div>
      <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>Chuỗi đúng: {streak}</div>
    </div>
  );
};
export default StatusBar;