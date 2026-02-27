import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddCourse = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courseName: '',
    courseDescription: '',
    instructor: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/courses`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-page-container">
        <div className="form-page-card">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back to Courses
          </button>
          <h1 className="page-title">Add New Course</h1>
          <p className="page-subtitle">Fill in the details to create a new course</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit} className="course-form">
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                placeholder="e.g. Introduction to React"
                required
              />
            </div>
            <div className="form-group">
              <label>Instructor</label>
              <input
                type="text"
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="courseDescription"
                value={form.courseDescription}
                onChange={handleChange}
                placeholder="Describe what this course covers..."
                required
                rows={5}
              />
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
