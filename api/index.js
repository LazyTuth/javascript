const express = require('express');
const app = express();

const config = require('config')
const mongoose = require('mongoose');

mongoose.connect(config.get('connectionString'), {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB...");
}).catch(err => {
    console.error("Could not connected to mongodb...", err);
});

const coursesSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    Date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model("Course", coursesSchema);
async function saveCourse() {
    const course = new Course({
        name: "Course Test Number 2",
        author: "Myself Again",
        tags: ["nodejs"],
        isPublished: true
    });
    const result = await course.save()
    console.log(result);
}
async function getCourses() {
    const courses = await Course.find().sort({name: 1}).select({name: 1, _id:0});
    console.log(courses);
}
// saveCourse();
getCourses();

const authentication = require('./middlewares/authentication');
const coursesRoute = require('./routes/courses');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const { number } = require('joi');

console.log(`My App Name: ${config.get('name')}`);
console.log(`My Email Server: ${config.get('mail.host')}`);
//console.log(`My Email Server Password: ${config.get('mail.password')}`); //create environment variable for app_mail_password using command: export app_mail_password=...

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authentication);
app.use('/api/courses', coursesRoute);
app.use('/api/users', userRoute);
app.use('/', homeRoute);

//PORT
const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening on port ${port} ...`));