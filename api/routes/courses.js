const express = require('express');
const router = express.Router();

const Joi = require('joi');

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');
    res.send(course);
});

router.post('/', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        age: req.body.age
    }
    const { error } = validateCourse(req.body);
    if (!error) {
        courses.push(course);
        return res.send(course);
    } else {
        return res.status(400).send(error.details);
    }
});

router.put('/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');

    const { error } = validateCourse(req.body);
    if (!error) {
        course.name = req.body.name;
        return res.send(course);
    } else {
        return res.status(400).send(error.details);
    }
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().integer().min(18)
    }).options({abortEarly: false});

    return schema.validate(course);
}

module.exports = router;