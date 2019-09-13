package es.ingenia.bookeditor.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.ingenia.bookeditor.entity.RoleBase;

@Repository
public interface RoleBaseRepository extends CrudRepository<RoleBase, Long> {

	List<RoleBase> findByAuthority(String authority);

	List<RoleBase> findAll();
}