import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../shared/interfaces';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    message: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };
    }
}
