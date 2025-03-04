import mysql from 'mysql2/promise';
import { config } from './config.js';


 const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user, 
  password: config.db.password,
  database: config.db.name
});


export async function testDatabase() {
  let connection;
  try {
      connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT 1+1 AS result');
      console.log('DB Connected Successfully:', rows[0].result);
  } catch (error) {
      console.error('Something went wrong in DB connection:', error.message);
  } finally {
      if (connection) connection.release();
  }
}

export default pool;