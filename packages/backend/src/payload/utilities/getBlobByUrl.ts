import mime from 'mime-types';

export function getBlobByUrl(
  url: string | URL,
  detectFileName = false,
  onLoading = (percent: number) => {
  }) {
  return new Promise(
    (resolve: (blob: { blob: Blob; filename: string }) => void, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        let filename: string = '';
        let contentType: string | null = null;
        if (detectFileName) {
          const contentDispostion = xhr.getResponseHeader(
            'content-disposition'
          );
          if (
            contentDispostion &&
            contentDispostion.match(/filename\*?=(utf-8'')?("?)([^"]*)\2$/)
          ) {
            filename = decodeURIComponent(RegExp.$3);
          } else {
            let URLObject: URL | undefined;
            if (url instanceof URL) {
              URLObject = url;
            } else if (typeof url === 'string') {
              if (url.startsWith('//')) {
                url = `${window.location.protocol}${url}`;
              }
              URLObject = new URL(url);
            }
            if (!URLObject) {
              throw new Error('no url');
            }
            const pathnameSegments = URLObject.pathname.split('/');
            for (let i = pathnameSegments.length - 1; i >= 0; i--) {
              const pathLastName = pathnameSegments[i];
              if (pathLastName && typeof pathLastName === 'string') {
                filename = pathLastName;
                // console.log('pathLastName', pathLastName, pathnameSegments);
                break;
              }
            }
            if (!filename) {
              filename = `${URLObject.host}`;
            }

            contentType = xhr.getResponseHeader('Content-Type');
            if (contentType) {
              const ext = mime.extension(contentType);
              if (!filename.endsWith(`.${ext}`)) {
                filename = `${filename}.${ext}`;
              }
            }
          }
        }
        const blob = new Blob([xhr.response], {
          type: contentType || 'application/octet-stream'
        });
        resolve({blob, filename: decodeURIComponent(filename)});
      };
      xhr.addEventListener('progress', (event) => {
        if (event.lengthComputable && onLoading) {
          onLoading(event.loaded / event.total * 100);
        }
      });
      xhr.onerror = reject;
      xhr.send();
    }
  );
}