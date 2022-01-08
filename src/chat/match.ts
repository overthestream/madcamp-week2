import queryGenerator from 'src/middleware/connector';
import { userInfo } from 'src/router/login/kakao';

interface user extends userInfo {
  mbti: string;
}

export const enqueue = (id: number) => {
  try {
    const query = {
      str: `INSERT INTO match_queue VALUES($1)`,
      val: [id],
    };
    queryGenerator(query);
    console.log(`user id: ${id} - enqueue!`);
  } catch (err) {
    console.log(err);
  }
};

export const dequeue = (id: number) => {
  try {
    const query = {
      str: `DELETE FROM match_queue WHERE id = $1)`,
      val: [id],
    };
    queryGenerator(query);
    console.log(`user id: ${id} - dequeue!`);
  } catch (err) {
    console.log(err);
  }
};

export const match = async (user: user) => {
  try {
    const query = {
      str: `SELECT users.id, users.age, users.gender, users.mbti FROM users NATURAL JOIN match_queue WHERE users.mbti = $1 `,
      val: [user.mbti],
    };
    const rows: Array<JSON> = await queryGenerator(query);
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
