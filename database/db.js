const sql = require("mssql/msnodesqlv8");

const config = {
  user: 'MernArsen',
  password: 'Drakking7?',
  server: 'mernsqltest.database.windows.net',
  database: 'ReactExpressNodeSqlTest',
}
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}