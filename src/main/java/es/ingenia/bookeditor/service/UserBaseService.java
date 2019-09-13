package es.ingenia.bookeditor.service;

import java.util.List;

import es.ingenia.bookeditor.dto.UserBaseDTO;

public interface UserBaseService {

	List<UserBaseDTO> findAllUserBase();

	UserBaseDTO findUserBaseById(Long id);

	UserBaseDTO createUserBase(UserBaseDTO userBaseDTO);

	void updateUserBase(Long id, UserBaseDTO userBaseDTO);

}
