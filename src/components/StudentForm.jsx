import React, { useState } from 'react';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', score: '', class: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, score, class: className } = formData;

    if (!name.trim() || !score.trim() || !className.trim()) {
      setError('Vui lòng không để trống bất kỳ trường nào!');
      return;
    }

    const numScore = parseFloat(score);
    if (numScore < 0 || numScore > 10 || isNaN(numScore)) {
      setError('Điểm số không hợp lệ! Vui lòng nhập từ 0 đến 10.');
      return;
    }

    setError('');
    onAdd({ name, score: numScore, class: className });
    
    setFormData({ name: '', score: '', class: '' });
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Thêm Sinh viên mới</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" name="name" value={formData.name} onChange={handleChange} 
          placeholder="Họ tên" style={{ marginRight: '10px' }}
        />
        <input 
          type="number" name="score" value={formData.score} onChange={handleChange} 
          placeholder="Điểm số" step="0.1" style={{ marginRight: '10px' }}
        />
        <input 
          type="text" name="class" value={formData.class} onChange={handleChange} 
          placeholder="Lớp" style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ cursor: 'pointer' }}>Thêm</button>
      </form>
      
   
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default StudentForm;