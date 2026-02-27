import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    courseName: '',
    courseDescription: '',
    instructor: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCourses = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `${API_URL}/api/courses${searchTerm ? `?search=${searchTerm}` : ''}`,
        authHeaders
      );
      setCourses(data.courses);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchCourses(val);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/courses`, form, authHeaders);
      setForm({ courseName: '', courseDescription: '', instructor: '' });
      fetchCourses(search);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`${API_URL}/api/courses/${id}`, authHeaders);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Create course form */}
        <section className="create-section">
          <h2>Add New Course</h2>
          {formError && <div className="error-msg">{formError}</div>}
          <form className="create-form" onSubmit={handleCreateCourse}>
            <input
              type="text"
              name="courseName"
              value={form.courseName}
              onChange={handleFormChange}
              placeholder="Course name"
              required
            />
            <input
              type="text"
              name="instructor"
              value={form.instructor}
              onChange={handleFormChange}
              placeholder="Instructor name"
              required
            />
            <textarea
              name="courseDescription"
              value={form.courseDescription}
              onChange={handleFormChange}
              placeholder="Course description"
              required
              rows={3}
            />
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Course'}
            </button>
          </form>
        </section>

        {/* Course list */}
        <section className="courses-section">
          <div className="courses-header">
            <h2>Courses</h2>
            <input
              type="text"
              className="search-input"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, instructor..."
            />
          </div>

          {loading && <p className="info-msg">Loading courses...</p>}
          {error && <div className="error-msg">{error}</div>}
          {!loading && courses.length === 0 && (
            <p className="info-msg">No courses found.</p>
          )}

          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
