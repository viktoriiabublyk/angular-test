import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../shared/interfaces';
import {ProductsService} from '../shared/components/products.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.products$ = this.productsService.getAll();
    }

    public firstPage() {
        this.products$  = this.productsService.getAll(this.productsService.first);
    }
    public previousPage() {

        if (this.productsService.prev !== undefined && this.productsService.prev !== '') {
            this.products$  = this.productsService.getAll(this.productsService.prev);
        }

    }
    public nextPage() {
        if (this.productsService.next !== undefined && this.productsService.next !== '') {
            this.products$ = this.productsService.getAll(this.productsService.next);
        }
    }
    public lastPage() {
        this.products$ = this.productsService.getAll(this.productsService.last);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
