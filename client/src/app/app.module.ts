import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';
import { BookEditorComponent } from './components/books/book-editor/book-editor.component';
import { ReviewDetailComponent } from './components/reviews/review-detail/review-detail.component';
import { ReviewEditorComponent } from './components/reviews/review-editor/review-editor.component';
import { UserBaseComponent } from './components/user-base/user-base.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MessageService } from './services/message.service';
import { AuthenticationService } from './services/authentication.service';
import { BookService } from './services/book.service';
import { ReviewService } from './services/review.service';
import { UserBaseService } from './services/user-base.service';

import { XhrInterceptor } from './helpers/xhr.interceptor';
import { XsrfInterceptor } from './helpers/xsrf.interceptor';
import { UnAuthInterceptor } from './helpers/unauth.interceptor';
import { UserBaseDetailComponent } from './components/user-base-detail/user-base-detail.component';
import { RoleChecksComponent } from './components/shared/role-checks/role-checks.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';

import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BookListComponent,
    ReviewListComponent,
    BookDetailComponent,
    BookEditorComponent,
    ReviewDetailComponent,
    ReviewEditorComponent,
    UserBaseComponent,
    UserBaseDetailComponent,
    RoleChecksComponent,
    ConfirmModalComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    NgbModule,
    AppRoutingModule
  ],
  providers: [
      MessageService,
      AuthenticationService,
      BookService,
      UserBaseService,
      ReviewService,
      NgbRatingConfig,

      { provide: HTTP_INTERCEPTORS, useClass: UnAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
      CookieService

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
