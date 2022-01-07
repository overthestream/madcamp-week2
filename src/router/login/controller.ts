import { Request, Response } from 'express';
import { userInfo } from './kakao';
import queryGenerator from '../../middleware/connector';

const kakao = require('./kakao');

const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const token: string = await kakao.getKaKaoToken(code);
    const user: userInfo = await kakao.getKakaoUserInfo(token);
    const query = {
      str: `SELECT * FROM users WHERE id = $1`,
      val: [user.id],
    };
    const rows: Array<JSON> = await queryGenerator(query);
    if (rows.length !== 0) {
      res.json(rows);
      res.status(200);
    } else {
      console.log(user);
      const insertQuery = {
        str: `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)`,
        val: [
          user.id,
          user.imageString,
          user.thumbnailString,
          user.email,
          user.ageRange,
          user.gender,
        ],
      };
      await queryGenerator(insertQuery);
      const rows2: Array<JSON> = await queryGenerator(query);
      res.json(rows2);
      res.status(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const putMBTI = async (req: Request, res: Response) => {
  try {
    const { MBTI, id } = req.body;
    const query = {
      str: `UPDATE users SET mbti = $1 WHERE id = $2`,
      val: [MBTI, id],
    };
    await queryGenerator(query);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

module.exports = { login, putMBTI };
