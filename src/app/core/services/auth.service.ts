import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

// Updated User interface with optional password
interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Made optional with '?'
  role: 'admin' | 'user' | 'guest';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private users: User[] = [];
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }

    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  register(userData: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Observable<User> {
    if (this.users.find((user) => user.username === userData.username)) {
      return throwError(() => 'Username already exists');
    }

    const newUser: User = {
      id: this.users.length + 1,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role as 'admin' | 'user' | 'guest',
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return of(userWithoutPassword);
  }

  login(username: string, password: string): Observable<any> {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return throwError(() => 'Invalid credentials');
    }

    const { password: _, ...sessionUser } = user;

    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    localStorage.setItem('token', 'mock-jwt-token');
    this.currentUserSubject.next(sessionUser);
    this.isAuthenticated.next(true);

    return of(sessionUser);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    this.isAuthenticated.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getRole(): string | null {
    return this.currentUserSubject.value?.role || null;
  }
}
