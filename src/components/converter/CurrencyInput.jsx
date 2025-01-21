import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CurrencyInput = ({ amount, setAmount, selectedCurrency, setSelectedCurrency }) => {
  const [currencies, setCurrencies] = useState([]);

  // 통화 목록 가져오기
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/fx/currencies');
        console.log('통화 목록 API 응답:', response.data); // 디버깅용 로그
        setCurrencies(response.data);
      } catch (error) {
        console.error('통화 목록 요청 오류:', error.message);
      }
    };

    fetchCurrencies();
  }, []);

  // React-Select 옵션 데이터 생성
  const options = currencies.map((currency) => ({
    value: currency.code,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={currency.flag}
          alt={currency.name}
          style={{ width: 20, height: 15, marginRight: 10 }}
        />
        {currency.name} ({currency.code})
      </div>
    ),
  }));

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <label htmlFor="amount" className="form-label">
          금액
        </label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="col-md-8">
        <label htmlFor="currency" className="form-label">
          통화 선택
        </label>
        <Select
          value={options.find((option) => option.value === selectedCurrency)}
          onChange={(selectedOption) => setSelectedCurrency(selectedOption.value)}
          options={options}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
