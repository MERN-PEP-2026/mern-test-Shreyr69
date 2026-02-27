import * as courseService from '../services/courseService.js';

export const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;
    const course = await courseService.createCourse({ courseName, courseDescription, instructor });
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const { search } = req.query;
    const courses = await courseService.getAllCourses(search);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    res.status(200).json({ success: true, message: 'Course deleted', course });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;
    const course = await courseService.updateCourse(req.params.id, {
      courseName,
      courseDescription,
      instructor,
    });
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
