import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { student, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/dashboard" className="navbar-brand">
        📚 Course Manager
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Courses
        </NavLink>
        <NavLink
          to="/courses/add"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          + Add Course
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Profile
        </NavLink>
      </div>
      <div className="navbar-right">
        {student && <span className="navbar-user">Hi, {student.name}</span>}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
