import { Student } from './app.domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from './app.dto';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url: string = 'http://localhost:8080/api/students';

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<any>(this.url) ?? [];
  }

  createStudent(dto: StudentDto) {
    return this.httpClient
      .post('http://localhost:8080/api/students', dto)
      .subscribe((response) => {
        console.log(response);
      });
  }
  
}
