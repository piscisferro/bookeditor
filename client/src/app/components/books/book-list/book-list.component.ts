import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';


import { Book } from '../../../models/book';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
	books: Array<Book>;
	baseBookUrl: string;

	constructor(private bookService: BookService, private route: ActivatedRoute) {	}

	ngOnInit(){
    	let paramUserId = this.route.params['value'] && this.route.params['value']['userId'];

    	if(paramUserId){
    		this.baseBookUrl = '/user/' + paramUserId + '/books';

    		this.bookService.findCurrentUserBooks().subscribe(data =>{ this.books = data; });

    	} else {
    		this.baseBookUrl = '/books';


    		this.bookService.findAllBooks().subscribe(data =>{ this.books = data; });

    	}


	}

}
