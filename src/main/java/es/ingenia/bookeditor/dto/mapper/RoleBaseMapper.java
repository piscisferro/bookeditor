package es.ingenia.bookeditor.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import es.ingenia.bookeditor.dto.RoleBaseDTO;
import es.ingenia.bookeditor.entity.RoleBase;

public class RoleBaseMapper {

	public static RoleBaseDTO roleBaseToDto(RoleBase roleBase) {

		return RoleBaseDTO.builder().id(roleBase.getId()).authority(roleBase.getAuthority()).build();

	}

	public static List<RoleBaseDTO> roleBaseListToDTO(List<RoleBase> roleBases) {

		List<RoleBaseDTO> roleBaseDTOList = new ArrayList<>();

		for (RoleBase r : roleBases) {
			roleBaseDTOList.add(roleBaseToDto(r));
		}

		return roleBaseDTOList;

	}
}
