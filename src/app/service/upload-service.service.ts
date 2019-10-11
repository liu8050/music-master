import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  private uploadUrl = '/upload';

    constructor(
        private http: HttpClient
    ) { }

    // 文件上传
    upload(data: FormData, fn) {
        const req = new HttpRequest('POST', this.uploadUrl, data, {
            reportProgress: true
        });

        return this.http.request(req).pipe(
            map(event => this.getEventMessage(event, fn))
        );
    }
    // 文件下载
  	download(url) {
	  	// 设置响应类型blob
        return this.http.post('/v1/download', { path: url }, { responseType: "blob" })
    }
    private getEventMessage(event: HttpEvent<any>, fn: Function) {
        
        switch (event.type) {
            case HttpEventType.Sent:
                return `开始上传文件`;
			// 正在上传
            case HttpEventType.UploadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `${percentDone}%`;
			// 上传完毕
            case HttpEventType.Response:
           		// 回调
                fn(event.body);
                return '文件上传完毕';
            default:
                return `文件上传`;
        }
    }

}
