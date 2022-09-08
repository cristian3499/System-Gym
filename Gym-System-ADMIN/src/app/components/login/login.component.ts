import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare const jQuery : any;
declare const $ : any;
declare const iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public userData : any = {};
  public token : any = '';

  constructor(
    private _adminService : AdminService,
    private _router: Router
    ) {
      this.token = this._adminService.getToken();
    }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/'])
    }else{
      //Se mantiene
    }
  }

  login(loginForm){
    if (loginForm.valid) {
      let data = {
        email : this.user.email,
        password : this.user.password
      }
      this._adminService.loginAdmin(data).subscribe({
          next: response => {
            this.userData = response.data
            localStorage.setItem('userName', this.userData.name)
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);
            iziToast.success({
              title: 'Ok',
              position: 'topCenter',
              message: 'Inicio de sesión correcto!',
              overlayClose: true,
              animateInside: true,
            });
            this._router.navigate(['/'])
          },
          error: err => {
            if(err.data == undefined){
              iziToast.error({
                title: 'ERROR',
                position: 'topCenter',
                message: 'Error al intentar acceder verifique su correo o contraseña',
                overlayClose: true,
                animateInside: true,
              });
            }
          }
        }
      );


    }else{
      iziToast.error({
        title: 'ERROR',
        position: 'topCenter',
        message: 'Asegurate que los campos esten completos',
        overlayClose: true,
        animateInside: true,
      });
    }
  }

}
