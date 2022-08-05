import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userName', 'password','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllEmployees();
      }
    })
  }

  getAllEmployees(){
    this.api.getEmployee().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error While Fetching the Records");
      }
    })
  }

  editEmployee(row: any){
    this.dialog.open(DialogComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllEmployees();
      }
    })
  }

  deleteEmployee(id : number){
    this.api.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("User Details Deleted Sucessfully");
        this.getAllEmployees();
      },
      error:()=>{
        alert("Error while deleting the User Details");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
