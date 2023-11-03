import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadBase64ToFirebase = async (
  base64: string,
  filePath?: string
): Promise<string> => {
  try {
    if (!filePath) filePath = `uploads/image-${uuidv4()}.png`;
    const bucket: Bucket = admin.storage().bucket();
    const base64Data = base64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const file = bucket.file(filePath);

    await file.save(buffer, {
      metadata: {
        contentType: 'image/png', // o 'image/jpeg' si es JPEG
      },
    });

    // Hacer el archivo público
    await file.makePublic();

    // Generar la URL en el formato de cliente de Firebase
    const encodedFilePath = encodeURIComponent(filePath);
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedFilePath}?alt=media`;
    return publicUrl;
  } catch (error) {
    console.error(`Error al subir la imagen: ${error}`);
    throw error;
  }
};
