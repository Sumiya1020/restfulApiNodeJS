const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'smartcar',
    password: '1234',
    port: 5432,
})
const getMedees = (request, response) => {
    pool.query('Select * From medee ORDER BY medee_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMedeeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM medee WHERE medee_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMedee = (request, response) => {
    const { zurag, garchig, onsarudur, uzelt } = request.body
  
    pool.query('insert into medee (zurag, garchig, onsarudur, uzelt) values ($1, $2, $3, $4)', [zurag, garchig, onsarudur, uzelt], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const updateMedee = (request, response) => {
    const id = parseInt(request.params.id)
    const { zurag, garchig, onsarudur, uzelt } = request.body
  
    pool.query(
        'UPDATE medee SET zurag = $1, garchig = $2, onsarudur = $3, uzelt = $4 WHERE medee_id = $5',
        [zurag, garchig, onsarudur, uzelt, id],
        (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteMedee = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM medee WHERE medee_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getMedees,
    getMedeeById,
    createMedee,
    updateMedee,
    deleteMedee,
}