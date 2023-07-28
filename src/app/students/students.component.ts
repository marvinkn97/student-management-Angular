import { Student } from './../app.domain';
import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { StudentDto } from '../app.dto';

import { NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgbModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  form!: FormGroup;
  @Input() students!: Student[];

  private fb = inject(FormBuilder);
  private modal = inject(NgbModal);
  private httpClient = inject(HttpClient);
  constructor() {
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
      course: [''],
      email: [''],
      phone: [''],
      address: [''],
    });
  }

  submitForm() {
    let dto = new StudentDto(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.address,
      this.form.value.course
    );

    this.httpClient
      .post('http://localhost:8080/api/students', dto)
      .subscribe((response) => {
        console.log(response);
      });
  }

  open(content: any) {
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
