const { sql, poolPromise } = require('../database/db');
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);


class ExerciseController {

  async getAllExercises(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query(queries.getAllExercises)
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async addNewExercise(req, res) {
    try {
      if (req.body.firstName != null && req.body.lastName != null && req.body.description != null && req.body.duration != null && req.body.date != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('firstName', sql.VarChar, req.body.firstName)
          .input('lastName', sql.VarChar, req.body.lastName)
          .input('description', sql.VarChar, req.body.description)
          .input('duration', sql.VarChar, req.body.duration)
          .input('date', sql.VarChar, req.body.date)
          .query(queries.addNewExercise)
        res.json(result)
      } else {
        res.send('Please fill all the details!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updateExercise(req, res) {
    try {
      if (req.body.description != null && req.body.duration != null && req.body.date != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('description', sql.VarChar, req.body.description)
          .input('duration', sql.VarChar, req.body.duration)
          .input('date', sql.VarChar, req.body.date)
          .query(queries.updateExercise)
        res.json(result)
      } else {
        res.send('All fields are required!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async deleteExercise(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query(queries.deleteExercise)
      res.json(result)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const exercise = new ExerciseController();
module.exports = exercise;