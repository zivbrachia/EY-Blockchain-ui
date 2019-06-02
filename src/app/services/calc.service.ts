import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private http: HttpClient) { }

  calc(statment: string) {
    return this.http.get(`http://localhost:3000/api/calc?${statment}`);
  }
}
