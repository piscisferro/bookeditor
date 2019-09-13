import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from '../../../services/book.service';


import { Book } from '../../../models/book';

@Component({
  selector: 'book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {

	@Input()
	book: Book;

	@Output()
	changeBook: EventEmitter<Book> = new EventEmitter<Book>();

	baseBookUrl: string;
	isCurrentUserAuthor: boolean;

	constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {	}

	ngOnInit(){

    	let paramBookId = this.route.params['value'] && this.route.params['value']['bookId'];
    	let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];

    	if(!paramBookId) return;

    	if(paramUserId){
    		this.baseBookUrl = '/user/' + paramUserId + '/books';
    		this.isCurrentUserAuthor = true;

    		this.bookService.findCurrentUserBookById(paramBookId)
				.subscribe(data =>{ this.book = data; });

    	} else {
    		this.baseBookUrl = '/books';
    		this.isCurrentUserAuthor = false;

    		this.bookService.findBookById(paramBookId)
				.subscribe(data =>{ this.book = data; });

    	}


	}

	handleChange(){
		console.info("change book description");

		this.bookService.updateBook(this.book)
			.subscribe(data =>{

				if(data){
					this.changeBook.emit( this.book );
				}

				this.router.navigateByUrl(this.baseBookUrl + '/' + this.book.id);

			});


	}

}
