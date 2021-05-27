import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userName: any = '';


  constructor(private fb: FormBuilder, private userService: UsersService,
    private router: Router, private actRoute: ActivatedRoute) {
    this.userForm = this.fb.group({
      id: 0,
      nome: '',
      sobrenome: '',
      idade: '',
      profissao: ''
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userName = params.get('nome');
      if(this.userName !== null) {
        this.userService.getUser(this.userName).subscribe(result => {
          this.userForm.patchValue({
            id: result[0].id,
            nome: result[0].nome,
            sobrenome: result[0].sobrenome,
            idade: result[0].idade,
            profissao: result[0].profissao,
          })
        })
      }
    })
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    this.userService.postUsers(this.userForm.value).subscribe(result => console.log('salvo', result));
    this.router.navigate(['/users']);
  }

  updateUser() {
    this.userService.updateUser(this.userName, this.userForm.value).subscribe(result => {
      console.log('usuario atualizado', result);
    })
    this.router.navigate(['/users']);
  }

  actionButton() {
    if(this.userName !== null) {
      this.updateUser();
    }else {
      this.createUser();
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }

}
