const Helpers = ({ status, lives, on5050, onSkip, onAddLife, used5050, usedSkip, usedAddLife }) => {
  const isAnswering = status === 'answering';
  return (
    <div style={{ marginTop: '15px' }}>
      <button disabled={!isAnswering || used5050} onClick={on5050} style={{ marginRight: '5px' }}>50:50</button>
      <button disabled={!isAnswering || usedSkip} onClick={onSkip} style={{ marginRight: '5px' }}>Bỏ qua</button>
      <button disabled={!isAnswering || usedAddLife || lives >= 3} onClick={onAddLife}>Thêm 1 mạng</button>
    </div>
  );
};
export default Helpers;