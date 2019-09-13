package es.ingenia.bookeditor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.ingenia.bookeditor.dto.RoleBaseDTO;
import es.ingenia.bookeditor.service.RoleBaseService;

@RestController
@RequestMapping(path = "api/roleBases")
public class RoleBaseController {

	@Autowired
	private RoleBaseService roleBaseService;

	@GetMapping
	public List<RoleBaseDTO> getAllRoleBase() {
		return roleBaseService.findAllRoleBase();
	}
}