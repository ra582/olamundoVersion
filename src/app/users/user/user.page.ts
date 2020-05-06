import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';


import { User } from '../../models/users.model';


import { UsersService } from '../../services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  id: string = this.route.snapshot.paramMap.get('id');

  noUser = false;

  data: User;

  constructor(

    private route: ActivatedRoute,

    private usersService: UsersService,

    private navCtrl: NavController

  ) { }

  ngOnInit() {

    // console.log('ID: ', this.id);

    this.usersService.getUser(this.id).subscribe(

      (res: any) => {

        if (res.status !== 'success') {
          console.error(`Erro: ${res.result}`);
          return false;
        }

        if (res.result === 'No record found') {

          this.noUser = true;
          return false;

        } else {

          this.data = res.result;
          console.log(this.data);

        }
      }
    );
  }

  editUser(id: string) {
    alert(`Editando ${id}...`);
  }

  delUser(id: string, name: string) {


    if (!confirm(
      `Tem certeza que deseja apagar "${name}"?\n
    Esta ação é irreversível!\n
Clique em [Ok] para apagar e [Cancelar] para não apagar...`
    )) {

      return false;
    }

    this.usersService.deleteUser(this.id).subscribe(
      (res: any) => {

        if (res.status === 'success' && res.result === 'Record deleted successfully') {

          alert(`Usuário apagado com sucesso!\n\nClique em [Ok] para continuar...`);

          this.navCtrl.navigateForward('usuarios/todos');

        } else {

          console.error('Falha ao apagar usuário: ', res.result);

        }
      }
    );
  }

  listUsers() {
    this.navCtrl.navigateForward('usuarios/todos');
  }
}
