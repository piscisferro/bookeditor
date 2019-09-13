package es.ingenia.bookeditor;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class BookeditorApplicationTests {
	private static String ADMIN_USERNAME = "admin";
	private static String ADMIN_PASSWORD = "admin";

	@Autowired
	private MockMvc mvc;

	@Test
	public void test001_initialRoles() throws Exception {
		// given
		// 3 user loaded in boot (BootstrapDataPopulator or V0_2_0__data_for_dev.sql)

		// when
		mvc.perform(
				get("/api/roleBases")
						.with(httpBasic(ADMIN_USERNAME, ADMIN_PASSWORD))
						.contentType(MediaType.APPLICATION_JSON)
		)
				// then

				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(3)))
				.andExpect(jsonPath("$[*].authority", containsInAnyOrder("AUTHOR", "REVIEWER", "ADMIN")));

	}

	@Test
	public void test002_initialAdminBooks() throws Exception {
		// given
		// 3 user loaded in boot (BootstrapDataPopulator or V0_2_0__data_for_dev.sql)

		// when
		mvc.perform(
				get("/api/books")
						.with(httpBasic(ADMIN_USERNAME, ADMIN_PASSWORD))
						.contentType(MediaType.APPLICATION_JSON)
		)
				// then
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(4)));

	}

	@Test
	public void test003_initialAuthor1Books() throws Exception {
		// given
		// 3 user loaded in boot (BootstrapDataPopulator or V0_2_0__data_for_dev.sql)

		// when
		mvc.perform(
				get("/api/books/search/books-current-user")
						.with(httpBasic("author1", "author1"))
						.contentType(MediaType.APPLICATION_JSON)
		)
				// then
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1)))
				.andExpect(jsonPath("$[0].title", equalTo("Divina Comedia")));

	}

	@Test
	public void test004_author1DoNotAccessAllBooks() throws Exception {
		// given
		// 3 user loaded in boot (BootstrapDataPopulator or V0_2_0__data_for_dev.sql)

		// when
		mvc.perform(
				get("/api/books")
						.with(httpBasic("author1", "author1"))
						.contentType(MediaType.APPLICATION_JSON)
		)
				// then
				.andExpect(status().isForbidden());

	}

}
