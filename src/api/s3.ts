import ky from 'ky';

export const fetchImageList = async (): Promise<string[]> => {
  try {
    return await ky.get('/api/images').json();
  } catch (e) {
    console.error(e);
    return [];
  }
};
