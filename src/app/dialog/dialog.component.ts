import { ApiService } from './../services/api.service';
import { Component, Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  hide = true;

  employeeForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private FormBuilder: FormBuilder, 
    private api : ApiService, 
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.employeeForm = this.FormBuilder.group({
      name:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['userName'].setValue(this.editData.userName);
      this.employeeForm.controls['password'].setValue(this.editData.password);
    }
  }
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value).subscribe({next:(res)=>{
          alert("User Added Sucessfully.");
          this.employeeForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the User");
        },
      })
      }
    }else{
      this.updateEmployee();
    }
  }
updateEmployee(){
  this.api.putEmployee(this.employeeForm.value,this.editData.id).subscribe({
    next:(res)=>{
      alert("User Update Sucessfully");
      this.employeeForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the User");
    },
  })
}
}
