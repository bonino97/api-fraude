import axios from 'axios';

export const imgToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return base64;
  } catch (error) {
    console.error(`Error al convertir la imagen a Base64: ${error}`);
    throw error;
  }
};
