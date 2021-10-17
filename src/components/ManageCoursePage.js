import React, { Fragment, useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
// import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';
const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    title: '',
    slug: '',
    authorId: null,
    category: '',
  });
  useEffect(() => {
    courseStore.addChangeListner(onChange);
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListner(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function HandlChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
    // updatedCourse.title = event.target.value;
  }
  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Author ID is required';
    if (!course.category) _errors.category = 'Category is required';

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      debugger;
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  }
  return (
    <Fragment>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={HandlChange}
        onSubmit={handleSubmit}
      />
      {/* <Prompt when={true} message="Are you sure you want to leave?" />
      {props.match.params.slug} */}
    </Fragment>
  );
};

export default ManageCoursePage;
