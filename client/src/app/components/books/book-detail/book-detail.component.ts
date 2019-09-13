import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../../../services/book.service';


import { Book } from '../../../models/book';

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
	book: Book;
	bookObs: Observable<Book>;
	baseBookUrl: string;
	isCurrentUserAuthor: boolean;

	constructor(private bookService: BookService, private route: ActivatedRoute) {	}

	ngOnInit(){

    	let paramBookId = this.route.params['value'] && this.route.params['value']['bookId'];
    	let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];

    	if(!paramBookId) return;

    	if(paramUserId){
    		this.baseBookUrl = '/user/' + paramUserId + '/books';
    		this.isCurrentUserAuthor = true;

    		this.bookObs = this.bookService.findCurrentUserBookById(paramBookId);
			//	.subscribe(data =>{ this.book = data; });

    	} else {
    		this.baseBookUrl = '/books';
    		this.isCurrentUserAuthor = false;

    		this.bookObs = this.bookService.findBookById(paramBookId);
			//	.subscribe(data =>{ this.book = data; });

    	}


	}

}
