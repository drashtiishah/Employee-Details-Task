import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeServiceService } from '../../service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private _empService: EmployeeServiceService) {}

  public employees:any = [];
  public message: string= '';

  public onFetchData = () => {
    return this._empService.getAllEmployees().subscribe(
      (data:any) => {
        // debugger;
        this.employees = data.employee;
        this.message = data.message;  
      }
    )
  }

}
