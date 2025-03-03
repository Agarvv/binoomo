import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export async function testDatabase() {
    try {
      const [rows] = await pool.query('SELECT 1+1 AS result');
      console.log('DB Connected Successfully:', rows[0].result);
    } catch (error) {
      console.error('Something went wrong in DB connection:', error.message);
    }
  }