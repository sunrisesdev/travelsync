import ky from 'ky';

export const trwlAPI = ky.create({
  prefixUrl: 'https://traewelling.de/api/v1',
});
