import express from 'express';
import axios from 'axios';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 환전 계산
router.get('/convert', async (req, res) => {
  const { from, amount, to } = req.query;
  try {
    // 환율 계산 (외부) API 호출
    const fxInfo = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENT_API_KEY}/pair/${from}/${to}`);
    const tempAmount = amount * fxInfo.data.conversion_rate; // (환전하고 싶은) 기준 통화 금액 x 환율
    const convertedAmount = (to === 'KRW') ? Math.round(tempAmount) : tempAmount;
    if (convertedAmount) {
      res.status(200).json({ to, convertedAmount }); // 목표 통화, 환전된 금액
    } else {
      res.status(404).json({ message: `환전 정보가 존재하지 않습니다.` });
    }
  } catch (error) {
    // console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and one of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
});

// 환율 히스토리
router.get('/history', async (req, res) => {
  const { currency } = req.query;
  try {
    // 환율 히스토리 (외부) API 호출
    // const fxHistory = await axios.get(``);
    if (fxHistory) {
      res.status(200).json({ fxHistory }); // 목표 통화, 환전된 금액
    } else {
      res.status(404).json({ message: `환율 히스토리가 존재하지 않습니다.` });
    }
  } catch (error) {
    // console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and one of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
});

export default router;
