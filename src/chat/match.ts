import queryGenerator from '../middleware/connector';
import { userData } from './socket';

export const enqueue = (id: string, socketID: string, finding: Number) => {
  try {
    const query = {
      str: `INSERT INTO match_queue VALUES($1, $2, $3)`,
      val: [id, socketID, finding],
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
      str: `DELETE FROM match_queue WHERE id = $1`,
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
      str: `SELECT match_queue.socketID, match_queue.finding, users.id, users.age, users.gender, users.mbti FROM users NATURAL JOIN match_queue`,
      val: [],
    };
    const rows: Array<any> = await queryGenerator(query);
    const filteredRows = rows.filter(element => {
      console.log(element);
      return (
        element.finding & (1 << mbtiMapping(user.mbti)) &&
        user.finding.valueOf() & (1 << mbtiMapping(element.mbti))
      );
    });
    if (filteredRows.length) {
      return filteredRows[0];
    } else {
      console.log('no user was found!');
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const mbtiMapping = (mbti: string) => {
  const map = ['I', 'N', 'F', 'P'];
  let result = 0;
  for (let i = 0; i < 4; ++i) {
    if (mbti[i] == map[i]) result |= 1 << i;
  }
  console.log(`${mbti}: ${result}`);
  return result;
};
