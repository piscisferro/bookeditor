package es.ingenia.bookeditor.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.ingenia.bookeditor.dto.ReviewDTO;
import es.ingenia.bookeditor.dto.RoleBaseDTO;
import es.ingenia.bookeditor.dto.UserBaseDTO;
import es.ingenia.bookeditor.dto.mapper.ReviewMapper;
import es.ingenia.bookeditor.dto.mapper.UserBaseMapper;
import es.ingenia.bookeditor.entity.Review;
import es.ingenia.bookeditor.entity.RoleBase;
import es.ingenia.bookeditor.entity.UserBase;
import es.ingenia.bookeditor.repository.RoleBaseRepository;
import es.ingenia.bookeditor.repository.UserBaseRepository;
import es.ingenia.bookeditor.service.UserBaseService;

@Service
public class UserBaseServiceImpl implements UserBaseService {

	@Autowired
	private UserBaseRepository userBaseRepository;

	@Autowired
	private RoleBaseRepository roleBaseRepository;

	@Override
	public List<UserBaseDTO> findAllUserBase() {

		return getUserBaseDTOS((List<UserBase>) userBaseRepository.findAll());

	}

	@Override
	public UserBaseDTO findUserBaseById(Long id) {
		return UserBaseMapper.userBaseToDto(userBaseRepository.findById(id).get());
	}

	@Override
	public UserBaseDTO createUserBase(UserBaseDTO userBaseDTO) {

		UserBase userBase = UserBaseMapper.userBaseDTOtoEntity(userBaseDTO);

		List<RoleBase> roleBaseList = new ArrayList();

		for(RoleBaseDTO roleBaseDTO : userBaseDTO.getRoles()) {
			roleBaseList.add(roleBaseRepository.findByAuthority(roleBaseDTO.getAuthority()).get(0));
		}

		userBase.setRoles(roleBaseList);

		return UserBaseMapper.userBaseToDto(userBaseRepository.save(userBase));
	}

	@Transactional
	@Override
	public void updateUserBase(Long id, UserBaseDTO userBaseDTO) {

		Optional<UserBase> optionalUserBaseFound = userBaseRepository.findById(id);

		if (optionalUserBaseFound.isPresent()) {
			try {

				UserBase userBaseFound = optionalUserBaseFound.get();

				List<RoleBase> roleBaseList = new ArrayList();

				for(RoleBaseDTO roleBaseDTO : userBaseDTO.getRoles()) {
					roleBaseList.add(roleBaseRepository.findByAuthority(roleBaseDTO.getAuthority()).get(0));
				}

				userBaseFound.setRoles(roleBaseList);

				userBaseRepository.save(userBaseFound);

			}
			catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	private List<UserBaseDTO> getUserBaseDTOS(List<UserBase> userBases) {

		List<UserBaseDTO> result = new ArrayList<>();

		if (!userBases.isEmpty()) {
			for (UserBase u : userBases) {
				result.add(UserBaseMapper.userBaseToDto(u));
			}
		}

		return result;
	}
}