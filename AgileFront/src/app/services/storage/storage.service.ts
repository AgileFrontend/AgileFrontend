import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  StorageReference,
} from '@angular/fire/storage';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    public firestore: Firestore,
    public storage: Storage,
  ) { }

  // Return a promise that resolve if the file is created correctly, retrun an error otherwiser
  async createFile(file: Blob, path: string) {
    const storageRef = ref(this.storage, path);
    return await uploadBytes(storageRef, file);
  }

  // Retrun the downlaod url of a file
  async readFile(path: string) {
    const storageRef = ref(this.storage, path);
    return await getDownloadURL(storageRef);
  }

  async readFileFromRef(ref: StorageReference) {
    return await getDownloadURL(ref);
  }

  // Return a promise that resolve if the file is deleted correctly, retrun an error otherwiser
  // path can be the file path, an gs referent to it, or the download url
  async deleteFile(path: string) {
    const storageRef = ref(this.storage, path);
    return await deleteObject(storageRef);
  }

  //Todo check for the update ?
}

export function requiredFileType(types: string[]): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const fileName = file.name as string;
      const extension = fileName.split('.').pop()?.toLowerCase();

      if (!extension || !types.includes(extension)) {
        return {
          requiredFileType: true
        };
      }  
      return null;
    }

    return null;
  };
}