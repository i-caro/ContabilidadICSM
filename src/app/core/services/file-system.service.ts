import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  // Método para guardar un archivo
  async saveFile(filename: string, content: string) {
    try {
      await Filesystem.writeFile({
        path: filename,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      console.log('Archivo guardado correctamente');
    } catch (error) {
      console.error('Error guardando archivo:', error);
    }
  }

  // Método para leer un archivo
  async readFile(filename: string) {
    try {
      const result = await Filesystem.readFile({
        path: filename,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      console.log('Contenido del archivo:', result.data);
      return result.data;
    } catch (error) {
      console.error('Error leyendo archivo:', error);
      return null;
    }
  }

  // Método para eliminar un archivo
  async deleteFile(filename: string) {
    try {
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Documents
      });
      console.log('Archivo eliminado correctamente');
    } catch (error) {
      console.error('Error eliminando archivo:', error);
    }
  }
}
