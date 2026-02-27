import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(course.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3 className="course-name">{course.courseName}</h3>
        <div className="course-actions">
          <button
            className="btn-edit"
            onClick={() => navigate(`/courses/edit/${course._id}`, { state: { course } })}
            title="Edit course"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(course._id)}
            title="Delete course"
          >
            ✕
          </button>
        </div>
      </div>
      <p className="course-description">{course.courseDescription}</p>
      <div className="course-footer">
        <span className="course-instructor">👨‍🏫 {course.instructor}</span>
        <span className="course-date">{formattedDate}</span>
      </div>
    </div>
  );
};

export default CourseCard;
