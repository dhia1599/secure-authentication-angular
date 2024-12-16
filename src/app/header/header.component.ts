import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {AuthService} from '../shared/_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    )
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/welcome']);
  }
}
