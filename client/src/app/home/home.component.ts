import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	restaurants : any;
    editRestaurants = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
	this.getRestaurants();
  }

	getRestaurants() {
		let observable = this._httpService.getRestaurants();
		observable.subscribe(data => {
			console.log(data);
			this.restaurants = data;
		});
	}

    cancelEdit(original: any, i) {
        this.restaurants[i] = original;

    }

    deleteRestaurant(id) {
		let observable = this._httpService.deleteRestaurant(id);
		observable.subscribe(data => {
			console.log(data);
            this.getRestaurants();
		});

    }

}
