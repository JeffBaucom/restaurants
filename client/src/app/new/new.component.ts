import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    newRestaurant = {name: '', cuisine: ''};
    error = {errors: {name: '', cuisine: ''}};

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.newRestaurant = {name: '', cuisine: ''};
  }

    submitRestaurant() {
        let observable = this._httpService.addRestaurant(this.newRestaurant);
        observable.subscribe(response => {
            let data = response as any;

            console.log(data);
            if (data.hasOwnProperty('error')) {
                this.error = data.error;
            } else {
                this.newRestaurant = {name: '', cuisine: ''};
                this.router.navigate(['']);
            }
        });

    }

    cancel() {
        this.router.navigate(['']);
    }

}
