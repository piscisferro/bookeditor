package es.ingenia.bookeditor.dto.mapper;

import org.springframework.beans.BeanUtils;

import es.ingenia.bookeditor.dto.UserBaseDTO;
import es.ingenia.bookeditor.entity.UserBase;

public class UserBaseMapper {

	public static UserBaseDTO userBaseToDto(UserBase userBase) {
		UserBaseDTO userBaseDTO = new UserBaseDTO();

		BeanUtils.copyProperties(userBase, userBaseDTO);

		return userBaseDTO;
	}

	public static UserBase userBaseDTOtoEntity(UserBaseDTO userBaseDTO) {
		UserBase userBase = new UserBase();

		userBase.setName(userBaseDTO.getName());
		userBase.setSurname(userBaseDTO.getSurname());
		userBase.setUsername(userBaseDTO.getUsername());
		userBase.setPassword("password");
		userBase.setEnabled(true);
		userBase.setAccountExpired(false);
		userBase.setAccountLocked(false);
		userBase.setPasswordExpired(false);

		return userBase;
	}
}
