import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { LoadingState } from '../../models/index';
import { UserPostActions } from '../../store/actions/user-post.actions';
import {
  getCurrentUser,
  getCurrentUserLoadingState,
} from '../../store/selectors/main.selectors';
import { MainState } from '../../store/states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLoadingState$ = this.store.pipe(
    select(getCurrentUserLoadingState)
  );
  public user$ = this.store.pipe(select(getCurrentUser));
  public loginInput: string = '';

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  inputFocus = false;

  constructor(private router: Router, private store: Store<MainState>) {}

  ngOnInit() {
    this.userLoadingState$
      .pipe(filter((x) => x === LoadingState.Success))
      .subscribe((x) => {
        this.router.navigate(['user']);
      });
  }

  public login() {
    if(!this.email.errors?.email){
      this.store.dispatch(UserPostActions.login({ email: this.loginInput }));
    }
  }

  onFocus(){
    this.inputFocus = true;
  }

}
