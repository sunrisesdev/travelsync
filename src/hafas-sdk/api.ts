import ky from 'ky';

export const hafasAPI = ky.create({
  prefixUrl: 'https://v6.db.transport.rest/',
});
