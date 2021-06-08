export const list = async (url) => {
  const options = {
    method: 'GET'
  };
  const response = await fetch(url, options);
  return await response.json();
};
