import { StudentService } from './../student.service';
import { Component, inject } from '@angular/core';
import { StudentsComponent } from '../students/students.component';
import { Student } from '../app.domain';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudentsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
}
