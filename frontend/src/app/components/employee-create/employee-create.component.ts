import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../../service/employee-service.service';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
  constructor(private formBuilder: FormBuilder, private _empService: EmployeeServiceService) {}

  public employeeForm = this.formBuilder.group({
    name: [''],
    email: [''],
    designation: [''],
    phoneNumber: ['']
  });

  public onSubmit() {
    return this._empService.createEmployee(this.employeeForm.value).subscribe({
      complete: () => {
        console.log('Employee successfully added!');
      },
      next: () => {
        this.employeeForm = this.formBuilder.group({
          name: [''],
          email: [''],
          designation: [''],
          phoneNumber: ['']
        }); 
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

}
