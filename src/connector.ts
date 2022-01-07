const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mbti',
  password: '0129',
  port: 5432,
});

const queryGenerator = async (queryStr: string, queryVal: Array<string>) => {
  const client = await pool.connect();
  try {
    const res = await client.query(queryStr, queryVal);
    client.release();
    return res.rows;
  } catch (err) {
    return err;
  }
};

module.exports = queryGenerator;
