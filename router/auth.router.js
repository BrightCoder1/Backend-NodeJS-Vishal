const express = require("express");

const router = express.Router();
const {home} = require("../controllers/home.controller");
const {register} = require("../controllers/register.controller");
const {login} = require("../controllers/login.controller");
const {contactForm} = require("../controllers/contact.controller");

router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/contact").post(contactForm);

module.exports = router;