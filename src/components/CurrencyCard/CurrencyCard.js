import './CurrencyCard.scss';

const CurrencyCard = ({ currencyData, indexedCurrency, multiplier, clickHandler }) => {

  const {
    code,
    description,
    rate,
    rate_float,
  } = currencyData;


  return (
    <>
      <div className="cardWrapper" id={code}>
        <div className="cardWrapper__currencyDetails">
          <h4>
            {description}
          </h4>
          <p className="cardWrapper__currencyRate">{`1 ${indexedCurrency} = ${rate}${code}`}</p>
        </div>
        <h3 className="cardWrapper__currencyTotal">{`${(rate_float * multiplier).toLocaleString()} ${code}`}</h3>
        <button
          id={code}
          className="button__remove"
          onClick={clickHandler}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CurrencyCard;
