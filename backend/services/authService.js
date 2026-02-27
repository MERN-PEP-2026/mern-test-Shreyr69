import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const registerStudent = async ({ name, email, password }) => {
  const existing = await Student.findOne({ email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const student = await Student.create({ name, email, password });
  const token = generateToken(student._id);

  return {
    token,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
    },
  };
};

export const loginStudent = async ({ email, password }) => {
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await student.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(student._id);

  return {
    token,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
    },
  };
};
