import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductsService} from '../shared/components/products.service';
import {Product} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

    form: FormGroup;
    product: Product;
    submited = false;
    uSub: Subscription;
    private updated: boolean;
    dSub: Subscription;
    products: Product[] = [];

    constructor(
        private route: ActivatedRoute,
        private ProductsService: ProductsService,
    ) { }

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap ((params: Params) => {
                    return this.ProductsService.getById(params.id);
                })
            ).subscribe((product: Product) => {
                this.product = product;
                this.form = new FormGroup({
                    name: new FormControl(product.name, [Validators.required]),
                    text: new FormControl(product.text, [Validators.required]),
                    category: new FormControl(product.category, [Validators.required])
                });
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submited = true;
        this.updated = false;

        this.uSub = this.ProductsService.update(this.product.id, {
            ...this.product,
            text: this.form.value.text,
            name: this.form.value.name,
            category: this.form.value.category,
        }).subscribe(() => {
            this.submited = false;
        });

        this.updated = true;
    }

    remove(id: string) {
        this.dSub = this.ProductsService.remove(id).subscribe(() => {
            this.products = this.products.filter( product => product.id !== id);
        });
    }

}

