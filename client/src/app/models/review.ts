import { Book } from "./book";

export class Review {
	id: number;
	rating: number;
	content: string;
	userId: number;
	book: Book;


	constructor(rating: number, content: string, book: Book) {
		this.rating = rating;
		this.content = content;
		this.book = book;
	}
}
