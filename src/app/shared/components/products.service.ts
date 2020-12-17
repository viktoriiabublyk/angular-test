import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FbCreateResponse, Product} from '../interfaces';
import {Observable} from 'rxjs';
import {catchError, map, retry, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductsService {
    public first: string;
    public prev: string;
    public next: string;
    public last: string;
    private url = `http://localhost:3000/products/`;

    constructor(private http: HttpClient) {}

    create(product: Product): Observable<Product> {
        return this.http.post(this.url, product)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...product
                };
            }));
    }

    getAll(page: string = this.url) {
        return this.http.get(page + `?_page=1`, {observe: `response`})
            .pipe(map((response: {[key: string]: any}) => {
                this.parseLinkHeader(response.headers.get('Link'));
                return Object
                    .keys(response.body)
                    .map(key => ({
                        ...response.body[key],
                    }));
            }));
    }



    getById(id: string): Observable<Product> {
        return this.http.get<Product>(this.url + id)
            .pipe(map((product: Product) => {
                return {
                    ...product, id,
                };
            }));
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(this.url + id);
    }

    update(id: string, product: Product): Observable<Product> {
        return this.http.patch<Product>(this.url + id, product);
    }

    parseLinkHeader(header) {
        console.log(header);
        if (header.length == 0) {
            return ;
        }

        let parts = header.split(',');
        var links = {};
        parts.forEach( p => {
            let section = p.split(';');
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        });

        this.first  = links["first"];
        this.last   = links["last"];
        this.prev   = links["prev"];
        this.next   = links["next"];
    }
}
