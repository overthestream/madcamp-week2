import { Request, Response } from 'express';
import { userInfo } from './kakao';
import queryGenerator from '../../middleware/connector';
import { getKaKaoToken, getKakaoUserInfo } from './kakao';

export const spinner = async (req: Request, res: Response) => {
  try {
    console.log('spinner');
    res.send(`
      <!DOCTYPE html>
      <html>

      <head>
        <style>
          .container {
            height: 100%;
            width: 100%;
          }

          .loader {
            margin-top: 60%;
            margin-left: 40%;
            border-top: 16px solid #F9FBFC;
            border-right: 16px solid #A0DBDB;
            border-bottom: 16px solid #56A7A7;
            border-left: 16px solid #FCEA90;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="loader"></div>
        </div>
      </body>

      </html>`);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const parsedCode = code?.toString();
    const token: string | undefined = await getKaKaoToken(parsedCode);
    const user: userInfo | undefined = await getKakaoUserInfo(token);
    if (user === undefined) {
      res.status(200);
      return;
    }
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

export const putMBTI = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const { MBTI, id } = req.query;
    const query = {
      str: `UPDATE users SET mbti = $1 WHERE id = $2`,
      val: [MBTI, id],
    };
    await queryGenerator(query);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
