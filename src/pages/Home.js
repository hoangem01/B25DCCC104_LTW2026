import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setPlayerName }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    setPlayerName(name);
    navigate('/play');
  };

  return (
    <div>
      <h2>Thử thách 3 mạng</h2>
      <p>Luật chơi: 15 câu hỏi, 3 mạng, 90 giây. Trả lời đúng được điểm, sai mất mạng.</p>
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