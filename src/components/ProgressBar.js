const ProgressBar = ({ results, currentIndex }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '12px 0' }}>
      {Array.from({ length: 15 }).map((_, i) => {
        let bgColor = 'lightgray';
        if (results[i] === 'correct') bgColor = 'lightgreen';
        if (results[i] === 'wrong') bgColor = 'red';
        if (results[i] === 'skipped') bgColor = 'orange';
        const border = i === currentIndex ? '2px solid black' : '1px solid gray';
        
        return (
          <div key={i} style={{ width: '25px', height: '25px', backgroundColor: bgColor, border, textAlign: 'center' }}>
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};
export default ProgressBar;