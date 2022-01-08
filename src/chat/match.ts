import queryGenerator from '../middleware/connector';
import { userData } from './socket';

export const enqueue = (id: string, socketID: string) => {
  try {
    const query = {
      str: `INSERT INTO match_queue VALUES($1, $2)`,
      val: [id, socketID],
    };
    queryGenerator(query);
    console.log(`user id: ${id} - enqueue!`);
  } catch (err) {
    console.log(err);
  }
};

export const dequeue = async (id: string) => {
  try {
    const query = {
      str: `DELETE FROM match_queue WHERE id = $1)`,
      val: [id],
    };
    await queryGenerator(query);
    console.log(`user id: ${id} - dequeue!`);
  } catch (err) {
    console.log(err);
  }
};

export const match = async (user: userData) => {
  try {
    const query = {
      str: `SELECT match_queue.socketID, users.id, users.age, users.gender, users.mbti FROM users NATURAL JOIN match_queue WHERE users.mbti = $1 `,
      val: [user.mbti],
    };
    const rows: Array<any> = await queryGenerator(query);
    if (rows.length) {
      return rows[0];
    } else {
      console.log('no user was found!');
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
