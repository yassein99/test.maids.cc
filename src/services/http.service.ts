import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { forkJoin, Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { CachingService } from './caching.service'; 
import { tap } from 'rxjs/operators';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) {}


  
  public getUsersPages(pageIndex: any): Observable<any> {
    const cacheKey = `users_page_${pageIndex}`;
    

    if (this.cachingService.hasCache(cacheKey)) {
      console.log('Calling cach:', `${API_URL}users?page=${pageIndex}`);
      return new Observable(observer => {
        observer.next(this.cachingService.getCache(cacheKey)); 
        observer.complete();
      });
    } else {
      console.log('Calling API:', `${API_URL}users?page=${pageIndex}`);
    return this.http.get(`${API_URL}users?page=${pageIndex}`).pipe(
      tap((res) => {
        this.cachingService.setCache(cacheKey, res);
      })
    );
  }
  }

  public getUsersDetail(id: any): Observable<any> {
    const cacheKey = `user_${id}`;
    

    if (this.cachingService.hasCache(cacheKey)) {
      console.log('Calling cach:', `${API_URL}users/${id}`);
      return new Observable(observer => {
        observer.next(this.cachingService.getCache(cacheKey)); 
        observer.complete();
      });
    } else {
      console.log('Calling API:', `${API_URL}users/${id}`);
    return this.http.get(`${API_URL}users/${id}`).pipe(
      tap((res) => {
        this.cachingService.setCache(cacheKey, res);
      })
    );
  }
  }
}
