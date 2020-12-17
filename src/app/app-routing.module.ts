import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {NewProductPageComponent} from './new-product-page/new-product-page.component';
import {LoginPageComponent} from './login-page/login-page.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: ProductListComponent},
            {path: 'new', component: NewProductPageComponent},
            {path: 'product/:id/edit', component: EditPageComponent},
            {path: 'product/:id', component: ProductPageComponent},
            {path: 'login', component: LoginPageComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
