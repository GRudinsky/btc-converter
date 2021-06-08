import { list } from './list';

const fetch = global.fetch;

const currencies = ["EUR","USD","JPY"]
describe('list', () => {
  it('should return indexes in the response', async () => {
    fetch.mockOnce(JSON.stringify(currencies));

    await list('someUrl').then((res) => {
      expect(fetch).toHaveBeenCalledWith('someUrl', { method: 'GET' });
      expect(res).toEqual(currencies);
    });
  });

  it('should return error in failed response', async () => {
    const errorResponse = new Error('Some Error');
    fetch.mockRejectOnce(errorResponse);

    await list('someUrl').catch((e) => {
      expect(e.message).toBe('Some Error');
    });
  });
});
