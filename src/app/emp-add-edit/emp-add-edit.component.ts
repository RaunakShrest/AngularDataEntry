import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormBuilder } from '@angular/forms'; // Import FormBuilder and FormGroup
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [MatInputModule,ReactiveFormsModule,MatButtonModule,MatDialogModule,MatIconModule,MatRadioModule,MatSelectModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent{

  // empForm: FormGroup;
education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
 empForm: FormGroup;
  constructor(private _fb: FormBuilder, private _empService: EmployeeService,  private _dialogRef:DialogRef<EmpAddEditComponent>) { // Inject FormBuilder
    // Initialize your form with form controls
    this.empForm = this._fb.group({
      firstName: '',
       lastName: '',
        email: '',
         dob: '',
           gender: '', 
      education: [''],
      experience:'',
      company: '',
      package: '', // Initialize education form control with an empty value
    });
  }
  onFormSubmit(){
    if(this.empForm.valid){
      // console.log(this.empForm.value)
      this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added succesfully')
this._dialogRef.close();
          },
          error: (err: any)=>{
            console.error(err)
          },
        })
      }
    }
  }
