import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';
const CHANGE_EVENT = 'change';
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListner(callBack) {
    this.on(CHANGE_EVENT, callBack);
  }
  removeChangeListner(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      debugger;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});
const store = new CourseStore();
export default store;
