const express = require('express');
const router = express.Router();

const Joi = require('joi');

const dummyUserData = [
    { 
        id: 1,
        userName: "admin", 
        email: "admin@gmail.com", 
        password: "123456",
        password_repeat: "123456",
        userDetail: {
            firstName: "Admin",
            lastName: "Admin",
            Dob: "1993/01/01",
            telephone: "0123456789"
        }
    },
    { 
        id: 2,
        userName: "normalUser", 
        email: "normal@gmail.com", 
        password: "123456",
        password_repeat: "123456",
        userDetail: {
            firstName: "Normal",
            lastName: "User",
            Dob: "1993/02/01",
            telephone: "0987654321"
        }
    }
];

router.get("/", (req, res) => {
    res.send(dummyUserData);
});

router.post("/", (req, res) => {
    const user = {
        id: dummyUserData.length + 1,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        password_repeat: req.body.password_repeat,
        userDetail: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Dob: req.body.dob,
            telephone: req.body.telephone
        }
    }

    const { error } = validateUser(req.body);
    if (!error) {
        dummyUserData.push(user);
        return res.status(201).send(user);
    } else {
        return res.status(400).send(error.details)
    }
});

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        password_repeat: Joi.ref('password'),
        userDetail: Joi.object().keys({
            firstName: Joi.string().max(30).required(),
            lastName: Joi.string().max(30).required(),
            Dob: Joi.date(),
            telephone: Joi.number()
        })
    }).options({abortEarly: false});

    return schema.validate(user);
}

module.exports = router;