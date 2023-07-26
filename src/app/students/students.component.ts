import { Component, Input } from '@angular/core';
import { Student } from '../app.domain';
import { NgFor} from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  @Input() students !: Student[];

}
