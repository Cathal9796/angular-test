import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingState, Tab } from './models';
import {
  getCurrentUser,
  getCurrentUserLoadingState,
  getCurrentUserName,
} from './store/selectors/main.selectors';
import { MainState } from './store/states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-test';

  tabs: Tab[] = [
    {
      name: 'User Posts',
      link: 'user',
    },
    {
      name: 'Other Posts',
      link: 'other',
    },
  ];

  activeTab = this.tabs[0];

  userInfoLoaded$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(private router: Router, store: Store<MainState>) {
    this.userInfoLoaded$ = store
      .pipe(select(getCurrentUserLoadingState))
      .pipe(map((x) => x === LoadingState.Success));
    this.userName$ = store.pipe(select(getCurrentUserName));
  }

  ngOnInit(): void {
    this.activeTab = this.tabs[0];
  }

  onTabClick(tab: Tab) {
    this.activeTab = tab;

    this.router.navigate([tab.link]);
  }
}
