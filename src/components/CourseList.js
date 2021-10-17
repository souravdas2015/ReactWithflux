import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function CourseList(props) {
  const renderRow = (course) => {
    return (
      <tr key={course.id}>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              props.deleteCourse(course.id);
            }}
          >
            Delete
          </button>
        </td>
        <td>
          {' '}
          <Link to={'/course/' + course.slug}>{course.title}</Link>
        </td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
      </tr>
    );
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author Id</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{props.courses.map((course) => renderRow(course))}</tbody>
      </table>
    </div>
  );
}
CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
CourseList.defaultProps = {
  courses: [],
};

export default CourseList;
