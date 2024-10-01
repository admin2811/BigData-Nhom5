const Student = require('../models/Student');
//Read
const getAllStudents = async (req, res) => {
    const students = await Student.find({});
    res.json({ success: true, data: students });
};

//Create
const createStudent = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ success: true, data: student, message: "Data saved successfully" });
};


// Update a student
const updateStudent = async (req, res) => {
    const { _id, ...rest } = req.body;
    await Student.updateOne({ _id: _id }, rest);
    res.json({ success: true, message: "Data updated successfully" });
};

// Delete a student
const deleteStudent = async (req, res) => {
    const id = req.params.id;
    await Student.deleteOne({ _id: id });
    res.json({ success: true, message: "Data deleted successfully" });
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};