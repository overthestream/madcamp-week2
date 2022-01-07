const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mbti',
  password: process.env.DB_PW || '0129',
  port: process.env.DB_PORT || 5432,
});

interface query {
  str: string;
  val: Array<any>;
}

const queryGenerator = async (query: query) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query.str, query.val);
    client.release();
    return res.rows;
  } catch (err) {
    return err;
  }
};

export default queryGenerator;
