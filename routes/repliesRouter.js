// const express = require('express');
import express from 'express';
const router = express.Router();

router.route('/')
  .get((req, res) => {
    console.log('GET /');
  })
  .post((req, res) => {
    console.log('POST /');
  })
  .put((req, res) => {
    console.log('PUT /');
  })
  .delete((req, res) => {
    console.log('DELETE /');
  });

export default router;
