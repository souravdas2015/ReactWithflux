import React, { Fragment, useState, useEffect } from 'react';
import { getCourses } from '../api/courseApi.js';
function CoursesPage() {
  const [courses, setCourses] = useState([]);
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     // state = {
  //     courses: [],
  //   };
  // }
  useEffect(() => {
    getCourses().then((_course) => setCourses(_course));
  }, []);

  const renderRow = (course) => {
    return (
      <tr key={course.id}>
        <td>{course.title}</td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
      </tr>
    );
  };

  return (
    <Fragment>
      <h2>Courses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author Id</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{courses.map((course) => renderRow(course))}</tbody>
      </table>
    </Fragment>
  );
}

export default CoursesPage;
