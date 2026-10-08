import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, class: '10A1' },
  { id: 2, name: 'Trần Thị B', score: 4.0, class: '10A2' },
  { id: 3, name: 'Lê Văn C', score: 6.5, class: '10A1' }
];

const App = () => {  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL'); 
  const handleAddStudent = (newStudent) => {    setStudents([...students, { ...newStudent, id: Date.now() }]);
  };
  const handleDeleteStudent = (id) => {    setStudents(students.filter(student => student.id !== id));
  };
  const filteredStudents = students.filter(student => {
    if (filterType === 'GOOD') return student.score >= 8;
    if (filterType === 'FAILED') return student.score < 5;
    return true;
  });
  const totalStudents = students.length;
    let averageScore = 0;
  if (totalStudents > 0) {
    const totalScore = students.reduce((sum, student) => sum + Number(student.score), 0);
    averageScore = (totalScore / totalStudents).toFixed(2);
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Quản lý Điểm Sinh viên</h1>
      
    
      <StudentForm onAdd={handleAddStudent} />

      <hr />

    
      <div style={{ marginBottom: '20px' }}>
        <h3>Thống kê & Bộ lọc</h3>
      
        <p>{`Tổng số sinh viên hiện tại: ${totalStudents}`}</p>
        <p>{`Điểm trung bình toàn lớp: ${averageScore}`}</p>
        
        <div>
          <button onClick={() => setFilterType('ALL')} style={{ marginRight: '10px' }}>Tất cả</button>
          <button onClick={() => setFilterType('GOOD')} style={{ marginRight: '10px' }}>{`Loại Giỏi (>= 8)`}</button>
          <button onClick={() => setFilterType('FAILED')}>{`Trượt (< 5)`}</button>
        </div>
      </div>

     
      <StudentList 
        students={filteredStudents} 
        onDelete={handleDeleteStudent} 
      />
    </div>
  );
};

export default App;