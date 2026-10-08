import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td style={{ color: score < 5 ? 'red' : 'black', fontWeight: score >= 8 ? 'bold' : 'normal' }}>
        {score}
      </td>
      <td>
        <button 
          onClick={() => onDelete(id)} 
          style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;