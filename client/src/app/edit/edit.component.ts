import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    @Input() restaurant: any;
    @Output() submitted = new EventEmitter<boolean>();
    @Output() cancelled = new EventEmitter<boolean>();
    error = {errors: {name: '', cuisine: ''}};
    original: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
      this.original = Object.assign({}, this.restaurant);
  }

    submitEdit() {

        console.log(this.original);
        let observable = this._httpService.editRestaurant(this.restaurant);
        observable.subscribe(response => {
            let data = response as any;
            console.log(data);
            if (data.hasOwnProperty('error')) {
                console.log("ERROR", data);
                this.error = data.error;
            } else {
                this.submitted.emit(true);
            }
        });
    }

    cancel() {
        this.cancelled.emit(this.original);
    }

}
