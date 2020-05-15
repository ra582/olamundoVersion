import { Component, OnInit } from '@angular/core';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from 'src/app/services/users.service';


import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-userform',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserformComponent implements OnInit {


  id = this.route.snapshot.paramMap.get('id');


  noUser = false;


  public userForm: FormGroup;

  constructor(

    private formBuilder: FormBuilder,


    private usersService: UsersService,


    public navCtrl: NavController,


    private route: ActivatedRoute
  ) {


    this.userForm = this.formBuilder.group(
      {

        id: [null],

        name: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])
        ],


        email: [
          null,
          Validators.compose([
            Validators.required,
            // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
          ])
        ],


        avatar: [
          null,
          Validators.compose([
            Validators.required,
            // tslint:disable-next-line: max-line-length
            // Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
            // tslint:disable-next-line: max-line-length
            Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
          ])
        ],


        status: [1]

      });
  }

  ngOnInit() {


    if (this.id) {


      this.usersService.getUser(this.id).subscribe(


        (res: any) => {


          if (res.result === 'No record found') {


            this.noUser = true;


            return false;


          } else {


            this.userForm.controls.id.setValue(res.result.id);
            this.userForm.controls.name.setValue(res.result.name);
            this.userForm.controls.email.setValue(res.result.email);
            this.userForm.controls.avatar.setValue(res.result.avatar);


            this.userForm.controls.status.setValue(parseInt(res.result.status, 10));
          }
        }
      );
    }
  }


  onSubmit() {

    // console.log(this.userForm.value);


    if (this.userForm.value.id === null) {



      delete this.userForm.value.id;


      if (!this.userForm.value.status) {
        this.userForm.value.status = 0;
      } else {
        this.userForm.value.status = 1;
      }


      this.usersService.postUser(this.userForm.value).subscribe(

        (res: any) => {


          if (res.status === 'success') {


            // tslint:disable-next-line: max-line-length
            if (confirm(`"${this.userForm.value.name}" foi adicionado com sucesso!\n\n    • Clique em [Ok] para listar usuários.\n    • Clique em [Cancel] para cadastrar outro usuário.`)) {


              this.navCtrl.navigateForward('usuarios/todos');
            } else {


              this.userForm.reset();
            }
          }
        }
      );


    } else {


      this.usersService.updateUser(this.userForm.value).subscribe(


        (res: any) => {


          if (res.status === 'success') {

            alert(`"${this.userForm.value.name}" atualizado com sucesso!\nClique em [Ok] para continuar...`);

            this.navCtrl.navigateForward(`usuarios/usuario/${this.userForm.value.id}${this.makeId()}`);
          }
        }
      );
    }
  }


  listUsers() {
    this.navCtrl.navigateForward('usuarios/todos');
  }


  makeId() {
    let text = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 7; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  }
}
