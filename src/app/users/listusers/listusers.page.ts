import { Component, OnInit } from '@angular/core';


import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.page.html',
  styleUrls: ['./listusers.page.scss'],
})

export class ListusersPage implements OnInit {


  itemsPage: any = [];
  private readonly offset: number = 10;
  private index = 0;


  noUsers = false;


  data: Array<any> = [];

  constructor(


    private usersService: UsersService
  ) { }

  ngOnInit(): void {


    this.usersService.getUsers().subscribe((res: any) => {


      if (res.status !== 'success') {
        console.log(`Falha: ${res.result}`);
        return false;
      }


      res.result.forEach((value: any) => {
        if (value !== null) {
          this.data.push(value);
        }
      });


      if (this.data.length === 0) {
        this.noUsers = true;

      } else {


        this.itemsPage = this.data.slice(this.index, this.offset + this.index);


        this.index += this.offset;
      }
    });
  }


  loadData(event) {

    setTimeout(() => {


      const news = this.data.slice(this.index, this.offset + this.index);
      this.index += this.offset;


      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < news.length; i++) {
        this.itemsPage.push(news[i]);
      }


      event.target.complete();


      if (this.itemsPage.length === this.data.length) {
        event.target.disabled = true;
      }


    }, 800);
  }
}
