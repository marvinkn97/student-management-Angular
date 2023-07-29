import { Student } from './../app.domain';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { StudentDto } from '../app.dto';

import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, NgbModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  form!: FormGroup;
  students: Student[] = [];
  data: boolean = false;

  deleteId!: number;

  private fb = inject(FormBuilder);
  private modal = inject(NgbModal);
  private httpClient = inject(HttpClient);
  private studentService = inject(StudentService);

  constructor() {
    this.form = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      course: [''],
      email: [''],
      phone: [''],
      address: [''],
    });

    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe((response) => {
      console.log(response);
      this.students = response;
      this.data = true;
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

    this.studentService.createStudent(dto);
  }

  open(targetModal: any) {
    this.modal.open(targetModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDetails(targetModal: any, student: Student) {
    this.modal.open(targetModal, { ariaLabelledBy: 'modal-basic-title2' });

    document
      .getElementById('fname2')
      ?.setAttribute('value', student?.firstName);
    document.getElementById('lname2')?.setAttribute('value', student?.lastName);
    document.getElementById('course2')?.setAttribute('value', student?.course);
    document.getElementById('email2')?.setAttribute('value', student?.email);
    document.getElementById('phone2')?.setAttribute('value', student?.phone);
    document
      .getElementById('address2')
      ?.setAttribute('value', student?.address);
  }

  openUpdate(targetModal: any, student: Student) {
    this.modal.open(targetModal, { ariaLabelledBy: 'modal-basic-title3' });
    this.form.patchValue({
      id: student?.id,
      firstname: student?.firstName,
      lastname: student?.lastName,
      course: student?.course,
      email: student?.email,
      phone: student?.phone,
      address: student?.address,
    });
  }

  update() {
    const updateURL =
      'http://localhost:8080/api/students/' + this.form.value.id;

    const dto = new StudentDto(
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.address,
      this.form.value.course
    );

    this.httpClient.put(updateURL, dto);
  }

  openDelete(targetModal: any, student: Student) {
    this.modal.open(targetModal, { ariaLabelledBy: 'modal-basic-title4' });
    this.deleteId = student.id;
  }

  delete() {
    const deleteURL = 'http://localhost:8080/api/students/' + this.deleteId;
    this.httpClient.delete(deleteURL).subscribe(() => {
      this.modal.dismissAll();
    });
  }
}
