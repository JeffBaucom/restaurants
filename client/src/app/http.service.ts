import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

    getRestaurants() {
        return this._http.get('/restaurants');
    }

    addRestaurant(restaurant) {
        return this._http.post('/restaurants', restaurant);
    }

    getOneRestaurant(id) {
        let url = '/restaurants/' + id;
        return this._http.get(url);
    }

    addReview(id, review) {
        let url = '/restaurants/' + id;
        return this._http.post(url, review);
    } 

    editRestaurant(restaurant) {
        let url = '/restaurants/' + restaurant._id;
        return this._http.put(url, restaurant);
    }

    deleteRestaurant(id) {
        let url = '/restaurants/' + id;
        return this._http.delete(url);
    }

}
