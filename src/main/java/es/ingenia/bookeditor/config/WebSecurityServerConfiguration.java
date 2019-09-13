package es.ingenia.bookeditor.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import es.ingenia.bookeditor.entity.Review;
import es.ingenia.bookeditor.service.impl.BookEditorUserDetailsServiceImpl;

@Configuration
public class WebSecurityServerConfiguration extends WebSecurityConfigurerAdapter {

	@Value("${bookeditor.security.cors.allowed.origin:'http://localhost:4200'}")
	private String apiAllowedOrigins;

	@Autowired
	private BookEditorUserDetailsServiceImpl bookEditorUserDetailsServiceImpl;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

		PasswordEncoder encoder = new BCryptPasswordEncoder();
		auth.userDetailsService(bookEditorUserDetailsServiceImpl).passwordEncoder(encoder);

	}

	@Bean
	public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
		return new SecurityEvaluationContextExtension();
	}

	@Component
	public class EntityExposingIdConfiguration extends RepositoryRestConfigurerAdapter {

		@Override
		public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
			config.exposeIdsFor(Review.class);
		}
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(Arrays.asList(apiAllowedOrigins.split(",")));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", configuration);

		source.registerCorsConfiguration("/logout", configuration);

		return source;
	}

	@Override
	public void configure(WebSecurity web) throws Exception {

		web.ignoring()
				.antMatchers("/js/**", "/css/**", "/images/**", "/img/**", "/favicon.ico", "/webjars/**", "/webjarslocator/**", "/error/**",
						"*.html")

				.antMatchers("/h2-console/*");      //test h2 console

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
            http
                .httpBasic()
                .and()
                //public urls
                .authorizeRequests()
                    .antMatchers("/", "/logout").permitAll()

                //private urls
                    .antMatchers("/api/actuator/**").hasAnyAuthority(	"ADMIN" )
                    .antMatchers("/api/books/search/books-current-user").hasAnyAuthority(		"AUTHOR", "ADMIN" )
                    .antMatchers("/api/books/search/book-current-user-by-id/*").hasAnyAuthority(	"AUTHOR", "ADMIN" )
                    .antMatchers(HttpMethod.OPTIONS, "/api/books/**").hasAnyAuthority(	"AUTHOR", "ADMIN" )
                    .antMatchers(HttpMethod.PUT, "/api/books/**").hasAnyAuthority(		"AUTHOR", "ADMIN" )
                    .antMatchers("/api/books/**").hasAnyAuthority(	"ADMIN", "REVIEWER" )
                    .antMatchers("/api/reviews/search/reviews-current-user").hasAnyAuthority(		"REVIEWER", "ADMIN" )
					.antMatchers("/api/reviews/search/review-current-user-by-id/*").hasAnyAuthority(		"REVIEWER", "ADMIN" )
					.antMatchers(HttpMethod.POST, "/api/reviews").hasAnyAuthority(		"REVIEWER", "ADMIN" )
					.antMatchers(HttpMethod.PUT, "/api/reviews/**").hasAnyAuthority(		"REVIEWER", "ADMIN" )
					.antMatchers(HttpMethod.DELETE, "/api/reviews/**").hasAnyAuthority(		"REVIEWER", "ADMIN" )
					.antMatchers("/api/reviews/**").hasAnyAuthority(    "ADMIN")
					.antMatchers("/api/user").authenticated()  //api calls
                    .antMatchers("/api/**").authenticated()  //api calls
					.antMatchers(HttpMethod.POST, "/api/user-base").hasAnyAuthority("ADMIN", "REVIEWER", "AUTHOR")
					.antMatchers(HttpMethod.PUT, "/api/user-base/**").hasAnyAuthority("ADMIN", "REVIEWER", "AUTHOR")

                //by default, no auth needed
                .anyRequest().permitAll()

                .and()
                .logout()
                	.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl("/api")
                .and()
                .cors()
                .and()
                .csrf()
                	.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
            // @formatter:on
	}
}
