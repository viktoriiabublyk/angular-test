import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './shared/components/product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NewProductPageComponent} from './new-product-page/new-product-page.component';
import {LoginPageComponent} from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProductListComponent,
    NewProductPageComponent,
    ProductComponent,
    ProductPageComponent,
    EditPageComponent,
    LoginPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
