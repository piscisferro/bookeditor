package es.ingenia.bookeditor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.ingenia.bookeditor.dto.ReviewDTO;
import es.ingenia.bookeditor.dto.UserBaseDTO;
import es.ingenia.bookeditor.service.UserBaseService;

@RestController
@RequestMapping(path = "api/user-base")
public class UserBaseController {

	@Autowired
	private UserBaseService userBaseService;

	@GetMapping
	public List<UserBaseDTO> getAllUserBase() {
		return userBaseService.findAllUserBase();
	}

	@GetMapping(path = "/{id}")
	public UserBaseDTO getUserBaseById(@PathVariable("id") Long id) {
		return userBaseService.findUserBaseById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public UserBaseDTO save(@RequestBody UserBaseDTO userBaseDTO) {

		return userBaseService.createUserBase(userBaseDTO);
	}

	@PutMapping(path = "/{id}")
	public void update(@PathVariable("id") Long id, @RequestBody UserBaseDTO userBaseDTO) {

		userBaseService.updateUserBase(id, userBaseDTO);
	}

}