import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
    review = {name: '', text: '', stars: '1'};
    error = {errors: {name: '', text: ''}}
    params: any;

     constructor(private router: Router, private _httpService: HttpService, private route: ActivatedRoute) { 
        this.route.params.subscribe( params => this.params = params);
    }

  ngOnInit() {
  }

    submitReview() {
        let stars = parseInt(this.review.stars);
        let newReview = {
            name: this.review.name,
            text: this.review.text,
            stars: stars
        }
        
        let observable = this._httpService.addReview(this.params.id, newReview);
        observable.subscribe(response => {
            let data = response as any;

            if (data.hasOwnProperty('error')) {
                this.error = data.error;
            } else {
                console.log(data)
                this.router.navigate(['/reviews', this.params.id]);
            }
        });
    }

}
