import axios, { AxiosRequestHeaders } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;
const REDIRECT_URI = 'http://192.249.18.173/user/spinner';
interface loginResponse {
  data: {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: string;
  };
}

export interface userInfo {
  id: number;
  imageString: string;
  thumbnailString: string;
  email: string;
  ageRange: string;
  gender: string;
}

export const getKaKaoToken = async (code?: string) => {
  try {
    const header: AxiosRequestHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const response: loginResponse = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      null,
      header
    );
    return response.data.access_token;
  } catch (err) {
    console.log(err);
  }
};

export const getKakaoUserInfo = async (token?: string) => {
  try {
    const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;

    const imageString = data.properties.profile_image;
    const thumbnailString = data.properties.thumbnail_image;
    const { email, gender } = data.kakao_account;
    const ageRange = data.kakao_account.age_range;
    const { id } = data;

    const result: userInfo = {
      imageString,
      thumbnailString,
      email,
      gender,
      ageRange,
      id,
    };
    return result;
  } catch (err) {
    console.log(err);
  }
};
