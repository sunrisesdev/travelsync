import ky from 'ky';
import Papa from 'papaparse';
import type { TrwlLineColorDefinition } from './types/traewelling';

const url = new URL(
  'https://raw.githubusercontent.com/Traewelling/line-colors/main/line-colors.csv'
);

export async function getLineColorDefinitions() {
  try {
    const data = await ky
      .get(url, {
        next: {
          revalidate: 60 * 60 * 24 * 7, // 1 week
          tags: ['trwl-line-colors'],
        },
      })
      .text();

    return Papa.parse<TrwlLineColorDefinition>(data, {
      header: true,
      skipEmptyLines: true,
    }).data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
