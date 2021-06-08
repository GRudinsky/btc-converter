import { useState, useEffect } from 'react';
import Select from 'react-select';
import CurrencyCard from '../../components/CurrencyCard';
import { list, currencyDropdownStyle } from '../../utils/services';
import { URL_COINDESK_BPI, ERROR_MESSAGE_LIST } from '../../utils/constants';
import './CurrencyContainer.scss';

const CurrencyContainer = () => {

  const [inputValue, setInputValue] = useState(0)
  const [currency, setCurrency] = useState('');
  const [priceIndexes, setPriceIndexes] = useState([]);
  const [indexCurrencies, setIndexCurrencies] = useState([]);
  const [removedIndexCurrencies, setRemovedIndexCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchInterval = 60000;

  useEffect(() => {
    getPriceIndexes();
    const interval = setInterval(() => {
      getPriceIndexes()
    }, fetchInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIndexCurrencies(priceIndexes.map(index => index.code))
  }, [priceIndexes]);

  const getPriceIndexes = async () => {
    try {
      const response = await list(URL_COINDESK_BPI);
      setCurrency(response.chartName);
      setPriceIndexes(Object.values(response.bpi));
    } catch (e) {
      setError(ERROR_MESSAGE_LIST);
    }
    setLoading(false);
  };


  const handleRemoveCurrency = (e) => {
    const { target: { id } } = e;
    !removedIndexCurrencies.includes(id) && setRemovedIndexCurrencies([...removedIndexCurrencies, id]);
  };

  const handleAddCurrency = (e) => {
    setRemovedIndexCurrencies(removedIndexCurrencies.filter(item => item !== e.value));
  };

  const formatSelectOptions = priceIndexes.filter(index => removedIndexCurrencies.includes(index.code))
    .map(item => ({ value: item.code, label: item.description }));

  return (
    <>
      <div className="header">
        <h1>{`${currency} amount`}</h1>
        <span className="number-wrapper">
          <input
            id="currencyInput"
            className="currencyInput"
            type="number"
            style={{ width: `${inputValue.length * 5}vmin` }}
            min={0}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </span>
      </div>
      <div className="mainWrapper">
        {loading && <h2 id="loadingMessage">Loading...</h2>}
        {error && <h2 id="errorMessage">{error}</h2>}
        {!loading && !error && (
          <div className="currencyWrapper">
            {priceIndexes
              .filter(index => !removedIndexCurrencies.includes(index.code))
              .map(item => {
                const { code } = item;
                return (
                  <div className="currencyWrapper__item" key={code}>
                    <CurrencyCard
                      currencyData={item}
                      indexedCurrency={currency}
                      multiplier={inputValue}
                      clickHandler={e => handleRemoveCurrency(e)}
                    />
                  </div>
                );
              })
            }
            {removedIndexCurrencies.length > 0 && (
              <Select
                value={null}
                styles={currencyDropdownStyle}
                placeholder={`Add ${indexCurrencies.length - removedIndexCurrencies.length > 0 ? 'another ' : ''}currency`}
                options={formatSelectOptions}
                onChange={(e) => handleAddCurrency(e)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CurrencyContainer;
