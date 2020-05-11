import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  public UserForm: FormGroup;

  constructor(
private formBuilder: FormBuilder,

private usersService: UsersService,
public navCtrl: NavController
  ) {


 this.UserForm = this.formBuilder.group(
  {

    id: [null],

    name: [
      'Joca da Silva',
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    ],


    email: [
      'joca@silva.com',
      Validators.compose([
        Validators.required,
        // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
      ])
    ],


    avatar: [
      'https://picsum.photos/200',

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

ngOnInit() { }


onSubmit() {
// console.log(this.UserForm.value);}
if (this.UserForm.value.id === null) {




  delete this.UserForm.value.id;

  if (!this.UserForm.value.status) {
    this.UserForm.value.status = 0;
  } else {
    this.UserForm.value.status = 1;
  }

  this.usersService.postUser(this.UserForm.value).subscribe(

    (res: any) => {


      if (res.status === 'success') {


        alert(`"${this.UserForm.value.name}" foi adicionado com sucesso!\nClique em [Ok] para continuar...`);

        this.navCtrl.navigateForward('usuarios/todos');

      }
    }
  );

} else {


}
}
}
