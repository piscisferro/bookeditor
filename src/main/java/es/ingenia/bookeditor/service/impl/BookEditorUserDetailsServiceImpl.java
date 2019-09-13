package es.ingenia.bookeditor.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.ingenia.bookeditor.entity.UserBase;
import es.ingenia.bookeditor.repository.UserBaseRepository;

@Service
public class BookEditorUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserBaseRepository userRepository;

	@Override
	public UserBase loadUserByUsername(String username) throws UsernameNotFoundException {
		UserBase user = userRepository.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("UserName " + username + " not found");
		}

		return user;
	}
}