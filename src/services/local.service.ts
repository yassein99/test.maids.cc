import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';
//import { Local } from '../modules/local-variable';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
 // private localDataSubject = new Subject<Local>();
  public pageIndix = 1;
  getLocalData() {
    return this.pageIndix;
  }

  updateLocalData(number: any) {
    this.pageIndix = number;
  }
}
