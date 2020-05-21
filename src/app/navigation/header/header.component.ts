import {Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store< fromRoot.State>,
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
}
