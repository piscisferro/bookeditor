import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Message } from '../../models/message';
import { INITIAL_MESSAGE, API_BASE_URL } from '../../app.constants';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
	
	title = 'Demo';
	greeting: Message = INITIAL_MESSAGE;
	apiBaseUrl: string = API_BASE_URL;
	
	constructor(private messageService: MessageService) {
		this.messageService.getMessage().subscribe(data => this.greeting = data);
	}

}
