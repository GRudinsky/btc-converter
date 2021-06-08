export const currencyDropdownStyle = {
  control: (base, state) => ({
    ...base,
    height: '10vh',
    width: '100%',
    background: "#000000",
    borderRadius: state.isFocused ? "10px 10px 0 0" : 10,
    border: "2px solid #dfdddd",
  }),
  menu: base => ({
    ...base,
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  })
};