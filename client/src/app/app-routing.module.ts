import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { UserBaseDetailComponent } from './components/user-base-detail/user-base-detail.component';

import { AuthGuard } from './helpers/auth.guard';
import { IsAdminGuard } from './helpers/is-admin.guard';
import { IsAuthorGuard } from './helpers/is-author.guard';
import { IsReviewerGuard } from './helpers/is-reviewer.guard';
import { LogoutGuard } from './helpers/logout.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },

	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
	{ path: 'welcome', component: HomeComponent  },

	{ path: 'user/:userId', component: HomeComponent, canActivate: [IsAdminGuard]  },

	{ path: 'books', component: BookListComponent, canActivate: [IsAdminGuard]  },
	{ path: 'reviews', component: ReviewListComponent, canActivate: [IsAdminGuard]  },
	{ path: 'books/:bookId', component: BookDetailComponent, canActivate: [IsAdminGuard]  },
	{ path: 'reviews/:reviewId', component: ReviewDetailComponent, canActivate: [IsAdminGuard]  },

	{ path: 'user/:userId/books', component: BookListComponent, canActivate: [IsAuthorGuard]  },
	{ path: 'user/:userId/books/:bookId', component: BookDetailComponent, canActivate: [IsAuthorGuard]  },
	{ path: 'user/:userId/books/:bookId/edit', component: BookEditorComponent, canActivate: [IsAuthorGuard]  },
	{ path: 'user/:userId/reviews', component: ReviewListComponent, canActivate: [IsReviewerGuard]  },
	{ path: 'user/:userId/reviews/:reviewId', component: ReviewDetailComponent, canActivate: [IsReviewerGuard]  },
	{ path: 'user/:userId/reviews/:reviewId/edit', component: ReviewEditorComponent, canActivate: [IsReviewerGuard]  },


	{ path: 'user-base', component: UserBaseComponent, canActivate: [IsAdminGuard]  },
	{ path: 'user-base/:id', component: UserBaseDetailComponent, canActivate: [IsAdminGuard]  },

	{ path: 'login', component: LoginComponent },
	{ path: 'logout', component: HomeComponent, canActivate: [LogoutGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
