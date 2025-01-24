import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CurrencyInput = ({ selectedCurrency, setSelectedCurrency }) => {
  const [currencies, setCurrencies] = useState([]);

  // 통화 목록 가져오기
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/fx/currencies');
        setCurrencies(response.data);
      } catch (error) {
        console.error('통화 목록 요청 오류:', error.message);
      }
    };

    fetchCurrencies();
  }, []);

  // React-Select 옵션 데이터 생성
  const options = currencies.map((currency) => ({
    value: currency.currencyCode, // 백엔드의 `currency_code`와 일치
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={currency.flagURL} // 백엔드의 `flagURL`과 일치
          alt={currency.currency}
          style={{ width: 20, height: 15, marginRight: 10 }}
        />
        {currency.currency} ({currency.currencyCode})
      </div>
    ),
  }));

  return (
    <div>
      <Select
        value={options.find((option) => option.value === selectedCurrency)}
        onChange={(selectedOption) => setSelectedCurrency(selectedOption.value)}
        options={options}
      />
    </div>
  );
};

export default CurrencyInput;
