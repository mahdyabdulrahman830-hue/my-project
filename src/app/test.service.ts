
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TestService {
//   private apiUrl = 'http://localhost:5000/api/upload';

//   constructor(private http: HttpClient) { }

//   uploadReport(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     return this.http.post(this.apiUrl, formData);
//   }
// }



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TestService {
//   private apiUrl = 'http://localhost:5000/api/upload';

//   constructor(private http: HttpClient) { }

//   uploadReport(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     return this.http.post(this.apiUrl, formData);
//   }

//   getAllReports(): Observable<any> {
//     return this.http.get('http://localhost:5000/api/upload');
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TestService {
//   private apiUploadUrl = 'http://localhost:5000/api/upload';
//   private apiGetUrl = 'http://localhost:5000/api/upload';

//   constructor(private http: HttpClient) { }

//   uploadReport(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     return this.http.post(this.apiUploadUrl, formData);
//   }

//   getReports(): Observable<any> {
//     return this.http.get(this.apiGetUrl);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUploadUrl = 'http://localhost:5000/api/upload';
  private apiReportsUrl = 'http://localhost:5000/api/uploads';

  constructor(private http: HttpClient) { }

  uploadReport(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.apiUploadUrl, formData);
  }

  getReports(): Observable<any> {
    return this.http.get(this.apiReportsUrl);
  }
}
