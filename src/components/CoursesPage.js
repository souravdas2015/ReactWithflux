import React, { Fragment, useState, useEffect } from 'react';
// import { getCourses } from '../api/courseApi.js';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList.js';
import { Link } from 'react-router-dom';
import { loadCourses, deleteCourse } from '../actions/courseActions';
function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     // state = {
  //     courses: [],
  //   };
  // }

  useEffect(() => {
    courseStore.addChangeListner(onChange);
    if (courses.length === 0) loadCourses();
    return () => courseStore.removeChangeListner(onChange); // cleanup on unmount
    // getCourses().then((_course) => setCourses(_course));
  }, [courses.length]);
  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <Fragment>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </Fragment>
  );
}

export default CoursesPage;
