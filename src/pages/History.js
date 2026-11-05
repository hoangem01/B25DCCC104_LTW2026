import { formatScore } from '../data';

const History = ({ history, setHistory }) => {
  const count = history.length;
  const maxScore = count > 0 ? Math.max(...history.map(h => h.score)) : 0;
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);

  const sortedHistory = [...history].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.livesLeft - a.livesLeft;
  });

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      {count === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <>
          <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>Số lượt chơi: <span style={{ color: '#007bff', fontWeight: 'bold', fontSize: '18px' }}>{count}</span></div>
          <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>Điểm cao nhất: {formatScore(maxScore)}</div>
          <div style= {{margin: '12px 0', fontWeight: '600', color: 'black'}}>Tổng số câu trả lời đúng: {totalCorrect}</div>
          <button onClick={() => setHistory([])} style={{ margin: '10px 0' }}>Xóa lịch sử</button>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Mạng còn lại</th>
                <th>Điểm</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map(h => (
                <tr key={h.id}>
                  <td>{h.name}</td>
                  <td>{h.correctCount}</td>
                  <td>{h.livesLeft}</td>
                  <td>{formatScore(h.score)}</td>
                  <td>{h.playedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default History;