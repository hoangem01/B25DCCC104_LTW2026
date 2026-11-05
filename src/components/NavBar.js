import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Trang chủ</NavLink>
      <NavLink to="/questions" className={({ isActive }) => (isActive ? 'active' : '')}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>Lịch sử</NavLink>
    </nav>
  );
};
export default NavBar;