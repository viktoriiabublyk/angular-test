import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../shared/interfaces';
import {ProductsService} from '../shared/components/products.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {

    form: FormGroup;
    product: Product;


    constructor(
        private router: Router,
        private ProductsService: ProductsService
    ) {
   }

    ngOnInit() {
        this.form = new FormGroup( {
            name: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required])
        });
    }
    submit() {
        if (this.form.invalid) {
            return;
        }

        const product: Product = {
            name: this.form.value.name,
            text: this.form.value.text,
            category: this.form.value.category
        };

        this.ProductsService.create(product).subscribe(() => {
            this.form.reset();
            console.log(product);
            this.router.navigate(['/']);
        });


    }
}

