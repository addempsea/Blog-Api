const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userProfile = require("../models/userProfile");
const dotenv = require("dotenv").config();

// For Sign up
const register = (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  userProfile.findOne({ email }, (err, data) => {
    if (err) next(err);
    if (data) {
      return res.status(409).json({
        message: "Email has been registered, Login instead!"
      });
    } else {
      bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(password, salt, (err, hash) => {
          const newUserProfile = new userProfile({
            username,
            password: hash,
            email,
            isAdmin
          });
          newUserProfile.save(err => {
            if (err) {
              return next(err);
            } else {
              return res.status(201).json({
                message: "Account created, login!"
              });
            }
          });
        });
      });
    }
  });
};

//FOR LOGIN
const login = (req, res, next) => {
  const { email, password } = req.body;
  userProfile.findOne({ email }, (err, data) => {
    if (err) {
      next(err);
    }
    if (!data) {
      return res.status(404).json({
        message: "email not found"
      });
    } else {
      bcryptjs.compare(password, data.password, (err, checkedPassword) => {
        if (!checkedPassword) {
          return res.status(403).json({
            message: "Wrong Password or email"
          });
        } else {
          const token = jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, {expiresIn: "48h"});
          return res.status(200).json({
            message: "Welcome!",
            token
          });
        }
      });
    }
  });
};

module.exports = {
  register,
  login
};
