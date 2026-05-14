// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let courses = [
    { id: 1, title: "Complete Python Bootcamp 2026", instructor: "Dr. Angela Yu", price: 1299, rating: 4.9, students: "248k", image: "https://picsum.photos/id/201/400/250", category: "Programming", progress: 65, enrolled: true },
    { id: 2, title: "UI/UX Design Masterclass", instructor: "Sarah Chen", price: 899, rating: 4.8, students: "87k", image: "https://picsum.photos/id/237/400/250", category: "Design", progress: 0, enrolled: false },
    { id: 3, title: "Digital Marketing Mastery", instructor: "Neil Patel", price: 1499, rating: 4.7, students: "312k", image: "https://picsum.photos/id/180/400/250", category: "Marketing", progress: 30, enrolled: true },
    { id: 4, title: "Machine Learning A-Z", instructor: "Kirill Eremenko", price: 1699, rating: 4.6, students: "142k", image: "https://picsum.photos/id/1015/400/250", category: "AI & ML", progress: 10, enrolled: false }
];

let myLearning = [];

// Get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Get My Learning
app.get('/api/my-learning', (req, res) => {
    res.json(courses.filter(c => c.enrolled));
});

// Enroll in course
app.post('/api/enroll/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (course) {
        course.enrolled = true;
        course.progress = 10;
        myLearning.push(course);
        res.json({ success: true, message: "Enrolled successfully!" });
    } else {
        res.status(404).json({ success: false });
    }
});

// Update progress
app.patch('/api/progress/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { progress } = req.body;
    const course = courses.find(c => c.id === id);
    if (course) {
        course.progress = progress;
        res.json({ success: true });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 EduMart Backend running on http://localhost:${PORT}`);
});