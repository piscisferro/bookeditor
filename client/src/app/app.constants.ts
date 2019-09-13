import { Message } from './models/message';

import { environment } from '../environments/environment';


export const INITIAL_MESSAGE = new Message("", "");


export const API_BASE_URL = environment.apiBaseUrl ?  environment.apiBaseUrl :  "http://localhost:8080";