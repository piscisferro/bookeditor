package es.ingenia.bookeditor.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.ingenia.bookeditor.entity.Author;
import es.ingenia.bookeditor.entity.Book;
import es.ingenia.bookeditor.entity.Review;
import es.ingenia.bookeditor.entity.RoleBase;
import es.ingenia.bookeditor.entity.UserBase;
import es.ingenia.bookeditor.entity.enums.BookCategoryEnum;
import es.ingenia.bookeditor.entity.enums.BookStateEnum;
import es.ingenia.bookeditor.repository.AuthorRepository;
import es.ingenia.bookeditor.repository.BookRepository;
import es.ingenia.bookeditor.repository.ReviewRepository;
import es.ingenia.bookeditor.repository.RoleBaseRepository;
import es.ingenia.bookeditor.repository.UserBaseRepository;

@Service
public class BootstrapDataPopulator implements InitializingBean {
	private final Logger logger = LoggerFactory.getLogger(BootstrapDataPopulator.class);

	@Autowired
	private Environment env;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	private RoleBaseRepository roleRepository;

	@Autowired
	private UserBaseRepository userRepository;

	@Autowired
	private AuthorRepository authorRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Override
	@Transactional()
	public void afterPropertiesSet() throws Exception {
		String activeEnv = "development";

		String[] enviroments = env.getActiveProfiles();
		if (enviroments != null && enviroments.length > 0) {
			activeEnv = enviroments[0];
		}

		if (activeEnv.equals("development") || activeEnv.equals("default")) {
			loadInitialDataForDevelopment();
			logger.info("initial data loaded in development env");
		}

		if (activeEnv.equals("stage")) {
			loadInitialDataForStage();
			logger.info("initial data loaded in test env");
		}

		if (activeEnv.equals("production")) {
			loadInitialDataForProduction();
			logger.info("initial data loaded in production env");
		}

	}

	private void loadInitialDataForStage() {

	}

	private void loadInitialDataForProduction() {

	}

	private void loadInitialDataForDevelopment() {
		List<RoleBase> roles = roleRepository.findAll();

		//tables are loaded
		if (roles == null || roles.size() > 0) {
			return;
		}

		RoleBase authorRol, reviewerRol, adminRol;
		roleRepository.save(authorRol = new RoleBase("AUTHOR"));
		roleRepository.save(reviewerRol = new RoleBase("REVIEWER"));
		roleRepository.save(adminRol = new RoleBase("ADMIN"));


		PasswordEncoder encoder = new BCryptPasswordEncoder();
		userRepository.save(new UserBase("author1", encoder.encode("author1"), "Dante", "Aligieri", authorRol));
		userRepository.save(new UserBase("author2", encoder.encode("author2"), "Miguel", "Cervantes", authorRol));
		userRepository.save(new UserBase("reviewer1", encoder.encode("reviewer1"), "John", "Cena", reviewerRol));
		userRepository.save(new UserBase("reviewer2", encoder.encode("reviewer2"), "John", "The Rock", reviewerRol));
		userRepository.save(new UserBase("admin", encoder.encode("admin"), "Antonio", "Mata", adminRol));

		UserBase author1 = userRepository.findByUsername("author1");
		UserBase author2 = userRepository.findByUsername("author2");
		UserBase reviewer1 = userRepository.findByUsername("reviewer1");
		UserBase reviewer2 = userRepository.findByUsername("reviewer2");

		Author dante, cervantes, verne, tolkien;
		authorRepository.save(dante = new Author("Dante", "Aligieri", author1.getId()));
		authorRepository.save(cervantes = new Author("Miguel", "De Cervantes", author2.getId()));
		authorRepository.save(verne = new Author("Julio", "Verne"));
		authorRepository.save(tolkien = new Author("J.R.R.", "Tolkien"));

		Book divina, quijote, viaje, anillos;
		bookRepository.save(divina = new Book("Divina Comedia", BookStateEnum.PENDING_REVISOR, BookCategoryEnum.Classic, dante));
		bookRepository.save(quijote = new Book("Don Quijote de la Mancha", BookStateEnum.PENDING_REVIEW, BookCategoryEnum.Humor, cervantes));
		bookRepository.save(viaje = new Book("Viaje al centro de la tierra", BookStateEnum.INIT, BookCategoryEnum.ScienceFiction, verne));
		bookRepository.save(anillos = new Book("El señor de los anillos", BookStateEnum.PUBLISHED, BookCategoryEnum.Fantasy, tolkien));

		divina.setContent("¿Que es pues la Comedia? La edad medieval realizada como arte, a pesar\n" +
				"del autor y de los contemporáneos. ¡Y notad qué cosa tan grande es\n" +
				"ésta! ");
		bookRepository.save(divina);

		quijote.setContent("En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho\n" +
				"tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua,\n" +
				"rocín flaco y galgo corredor. ");
		bookRepository.save(quijote);

		viaje.setContent("Looking back to all that has occurred to me since that eventful day, I\n" +
				"am scarcely able to believe in the reality of my adventures. They were\n" +
				"truly so wonderful that even now I am bewildered when I think of them.");
		bookRepository.save(viaje);

		anillos.setContent("Todo comenzó en la Segunda Edad Del Sol .\n" +
				"Altos herrero Élficos crearon anillos con grandes poderes para preservar la vida en la Tierra .");
		bookRepository.save(anillos);

		reviewRepository.save(new Review(4, "gracioso pero dificil", reviewer1.getId(), quijote));
		reviewRepository.save(new Review(3, "muy lento y demasiado minucioso", reviewer2.getId(), anillos));

	}
}