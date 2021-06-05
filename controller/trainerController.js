const { sql, poolPromise } = require('../database/db');
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);

class TrainerController {
    async getAllTrainers(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getAllTrainers)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewTrainer(req, res) {
        try {
            if (req.body.firstName != null && req.body.lastName != null && req.body.email != null && req.body.phone != null ) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('firstName', sql.VarChar, req.body.firstName)
                    .input('lastName', sql.VarChar, req.body.lastName)
                    .input('email', sql.VarChar, req.body.email)
                    .input('phone', sql.VarChar, req.body.phone)
                    .query(queries.addNewTrainer)
                res.json("User added!")
            } else {
                res.send('Please fill all the details!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async updateTrainer(req, res) {
        try {
            if (req.body.lastName && req.body.email && req.body.phone) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('firstName', sql.VarChar, req.body.firstName)
                    .input('lastName', sql.VarChar, req.body.lastName)
                    .input('email', sql.VarChar, req.body.email)
                    .input('phone', sql.VarChar, req.body.phone)
                    .query(queries.updateTrainer)
                res.json(result)
            } else {
                res.send('All fields are required!')
            }
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
    async deleteTrainer(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.deleteTrainer)
            res.json(result)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

const trainer = new TrainerController();
module.exports = trainer;