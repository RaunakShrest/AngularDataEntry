import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog'; 
import { Inject, OnInit,ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmployeeService } from './services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSortModule,MatPaginatorModule,MatPaginator,MatSort,MatTableModule,MatLabel,MatInputModule,MatIconModule, MatFormFieldModule,MatDialogModule,MatToolbarModule,MatButtonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: EmployeeService) {}





  ngOnInit(): void {
    this.getEmployeeList();
  }

openAddEditEmpForm(){
  this._dialog.open(EmpAddEditComponent);

}
getEmployeeList() {
  // console.log('Fetching employee list...');
  this._empService.getEmployeeList().subscribe({
    next: (res) => {
      // console.log('Response:', res);
      // Handle response
      this.dataSource= new MatTableDataSource(res)
      this.dataSource.sort= this.sort
      this.dataSource.paginator= this.paginator
    },
    error: (err) => {
      console.error('Error fetching employee list:', err);
    }
  });

  
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

deleteEmployee(id: number){

  this._empService.deleteEmployee(id).subscribe({
    next: (res)=>{
      alert("Employee deleted!")
      this.getEmployeeList();
    },
    error:console.log
  })
}




  }

