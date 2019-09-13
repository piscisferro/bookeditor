package es.ingenia.bookeditor.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api")
public class UserController {

	@GetMapping("user")
	public Principal getCurrentUser(Principal user) {
		return user;
	}
}