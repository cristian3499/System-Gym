import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare const Jquery:any;
declare const $:any;
declare const iziToast;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  public clients : Array<any> = [];
  public filterLastName = '';
  public filterEmail = '';
  public page = 1;
  public pageSize = 5;
  public token;
  public loading = true

  constructor(
    private _adminService : AdminService,
    ) {
      this.token = this._adminService.getToken();

    }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._adminService.getClients(null, null, this.token).subscribe(
      {
        next: response => {
          this.clients = response.data
          this.loading = false

        },
        error: err => {
          if(err.data == undefined){
            iziToast.error({
              title: 'ERROR',
              position: 'topCenter',
              message: 'Error al cargar a los clintes',
              overlayClose: true,
              animateInside: true,
            });
          }
        }
      }
    );
  }

  filter(type){
    if (type == 'lastName') {
      if (this.filterLastName) {
        this.loading = true
        this._adminService.getClients(type, this.filterLastName, this.token).subscribe(
          {
            next: response => {
              this.clients = response.data
              this.loading = false
            },
            error: err => {
              if(err.data == undefined){
                iziToast.error({
                  title: 'ERROR',
                  position: 'topCenter',
                  message: 'Error al cargar al cliente',
                  overlayClose: true,
                  animateInside: true,
                });
              }
            }
          });
      }else {
        this.initData();
      }
    }else if(type == 'email'){
      if (this.filterEmail) {
        this.loading = true
        this._adminService.getClients(type, this.filterEmail, this.token).subscribe(
          {
            next: response => {
              this.clients = response.data
              this.loading = false
            },
            error: err => {
              if(err.data == undefined){
                iziToast.error({
                  title: 'ERROR',
                  position: 'topCenter',
                  message: 'Error al cargar a los clientes',
                  overlayClose: true,
                  animateInside: true,
                });
              }
            }
          }
        );
      }else{
        this.initData();
      }
    }
  }

  deleteClient(id){
    this._adminService.deleteClient(id, this.token).subscribe({
      next: response => {
        iziToast.success({
          title: 'Ok',
          position: 'topCenter',
          message: 'Cliente eliminado corectamente',
          overlayClose: true,
          animateInside: true,
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.initData();
      },
      error: err => {
        iziToast.error({
          title: 'ERROR',
          position: 'topCenter',
          message: 'Error al borrar el cliente',
          overlayClose: true,
          animateInside: true,
        });
      }
    })
  }


}
