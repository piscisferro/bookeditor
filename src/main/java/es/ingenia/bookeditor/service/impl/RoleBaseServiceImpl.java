package es.ingenia.bookeditor.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.ingenia.bookeditor.dto.RoleBaseDTO;
import es.ingenia.bookeditor.dto.mapper.RoleBaseMapper;
import es.ingenia.bookeditor.repository.RoleBaseRepository;
import es.ingenia.bookeditor.service.RoleBaseService;

@Service
public class RoleBaseServiceImpl implements RoleBaseService {

	@Autowired
	private RoleBaseRepository roleBaseRepository;

	@Override
	public List<RoleBaseDTO> findAllRoleBase() {
		return RoleBaseMapper.roleBaseListToDTO(roleBaseRepository.findAll());
	}
}
