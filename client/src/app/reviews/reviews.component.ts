import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
    restaurant : any;
    reviews: any;
    params: any;

    constructor(private _httpService: HttpService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.params = params);
    }

  ngOnInit() {
      this.restaurant = {reviews: [], name: '', cuisine: ''}
      this.getReviews();
  }

    getReviews() {

        let observable = this._httpService.getOneRestaurant(this.params.id);
        observable.subscribe(data => {
            console.log(data);
            this.restaurant = data;
            this.reviews = this.restaurant.reviews;
            this.reviews = this.reviews.sort(function(a: any, b: any) {
                return b.stars - a.stars;
            });
        });

    }


}
