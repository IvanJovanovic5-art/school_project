import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Ad } from '../app/_models/ad';

@Injectable({ providedIn: 'root' })
export class AdService {
    private adSubject: BehaviorSubject<Ad>;
    public ad: Observable<Ad>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adSubject = new BehaviorSubject<Ad>(JSON.parse(localStorage.getItem('ad')));
        this.ad = this.adSubject.asObservable();
    }

    public get adValue(): Ad {
        return this.adSubject.value;
    }

    registerAd(ad: Ad) {
        return this.http.post(`${environment.apiUrl}/ads/registerAd`, ad);
    }

    getAll() {
        return this.http.get<Ad[]>(`${environment.apiUrl}/ads`);
    }

    getById(id: string) {
        return this.http.get<Ad>(`${environment.apiUrl}/ads/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/ads/${id}`, params)
            .pipe(map(x => {
                if (id == this.adValue.id) {
                    const ad = { ...this.adValue, ...params };
                    localStorage.setItem('ad', JSON.stringify(ad));

                    this.adSubject.next(ad);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/ads/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}