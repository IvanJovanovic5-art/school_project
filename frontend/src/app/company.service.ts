import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Company } from '../app/_models/company';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    private companySubject: BehaviorSubject<Company>;
    public company: Observable<Company>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.companySubject = new BehaviorSubject<Company>(JSON.parse(localStorage.getItem('company')));
        this.company = this.companySubject.asObservable();
    }

    public get  companyValue(): Company {
        return this.companySubject.value;
    }

    registerCompany(company: Company) {
        return this.http.post(`${environment.apiUrl}/companies/registerCompany`, company);
    }

    getAll() {
        return this.http.get<Company[]>(`${environment.apiUrl}/companies`);
    }

    getById(id: string) {
        return this.http.get<Company>(`${environment.apiUrl}/companies/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/companies/${id}`, params)
            .pipe(map(x => {
                if (id == this.companyValue.id) {
                    const company = { ...this.companyValue, ...params };
                    localStorage.setItem('company', JSON.stringify(company));

                    this.companySubject.next(company);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/companies/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}