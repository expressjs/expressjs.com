/GERIESCOLA
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
├── .env
└── README.md
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Servidor rodando na porta 5000')))
  .catch(err => console.error(err));
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nome: String,
  dataNascimento: Date,
  foto: String,
  contacto: String,
  turma: String,
  historicoEscolar: Array,
  status: { type: String, default: 'matriculado' } // ou 'transferido'
});

module.exports = mongoose.model('Student', studentSchema);
const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
  }
};

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);

module.exports = router;
import React from 'react';
import StudentList from './components/StudentList';

function App() {
  return (
    <div>
      <h1>GERIESCOLA - Gestão Escolar</h1>
      <StudentList />
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.nome} - {student.turma}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
