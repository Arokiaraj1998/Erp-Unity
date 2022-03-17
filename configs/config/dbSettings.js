require('dotenv').config();

const dbConnectionSettings = {
   uri : process.env.DB_CON,
   databaseName: 'OfficeStimulate',  
}

module.exports = dbConnectionSettings