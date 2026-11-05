import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ setPlayerName, history }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    setPlayerName(name);
    navigate('/play');
  };

  const highestRecord = history.length > 0 
    ? [...history].sort((a, b) => b.score - a.score)[0] 
    : null;

  return (
    <div>
      <h2>Thử thách 3 mạng</h2>
      <p>Luật chơi: 15 câu hỏi, 3 mạng, 90 giây. Trả lời đúng được điểm, sai mất mạng.</p>
      {highestRecord && (
        <p>Kỷ lục: {formatScore(highestRecord.score)} - {highestRecord.name}</p>
      )}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nhập tên người chơi" 
      />
      <button disabled={!name.trim()} onClick={handleStart}>Bắt đầu</button>
    </div>
  );
};
export default Home;