import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { student } = useAuth();

  const initials = student?.name
    ? student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <>
      <Navbar />
      <div className="form-page-container">
        <div className="form-page-card profile-card">
          <div className="profile-avatar">{initials}</div>
          <h1 className="profile-name">{student?.name}</h1>
          <p className="profile-email">{student?.email}</p>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span className="profile-info-label">Full Name</span>
              <span className="profile-info-value">{student?.name}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">Email Address</span>
              <span className="profile-info-value">{student?.email}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">Role</span>
              <span className="profile-info-value">Student</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">Account ID</span>
              <span className="profile-info-value profile-id">{student?.id}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
