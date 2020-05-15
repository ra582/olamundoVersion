import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';


import { ResponseUsers, ResponseUser, ResponseDelUser, ResponsePostUser, ResponsePutUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private apiurl = 'http://localhost:8888/api';


  constructor(private http: HttpClient) { }


  getUsers(): Observable<ResponseUsers> {

    return this.http.get<ResponseUsers>(this.apiurl);
  }


  getUser(id: string): Observable<ResponseUser> {


    const url = `${this.apiurl}?id=${id}`;


    return this.http.get<ResponseUser>(url);
  }


  deleteUser(id: string): Observable<ResponseDelUser> {


    const url = `${this.apiurl}?id=${id}`;


    return this.http.delete<ResponseDelUser>(url);
  }


  postUser(data: any): Observable<ResponsePostUser> {


    return this.http.post<ResponsePostUser>(this.apiurl, data);
  }


  updateUser(data: any): Observable<ResponsePutUser> {


    return this.http.put<ResponsePutUser>(this.apiurl, data);
  }
}
