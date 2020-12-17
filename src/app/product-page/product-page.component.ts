import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {ProductsService} from '../shared/components/products.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

    product$: Observable<Product>;

    constructor(
        private route: ActivatedRoute,
        private ProductsService: ProductsService
    ) {
    }

    ngOnInit() {
        this.product$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.ProductsService.getById(params['id']);
            }));
    }

}
