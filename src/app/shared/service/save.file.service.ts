import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  }
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  downloadFile(
    base64Value,
    fileName = 'report',
    contenttype = 'application/pdf'
  ) {
    var ddd = this.b64toBlob(base64Value, contenttype);
    let fii = new File([ddd], fileName, { type: contenttype });
    saveAs(fii);
  }
}
