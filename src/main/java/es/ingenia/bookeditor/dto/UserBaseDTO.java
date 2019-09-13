package es.ingenia.bookeditor.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBaseDTO {

	private Long id;

	private String name;

	private String surname;

	private String username;

	private boolean enabled;

	private boolean accountExpired;

	private boolean accountLocked;

	private boolean passwordExpired;

	private List<RoleBaseDTO> roles;
}
