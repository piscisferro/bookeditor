package es.ingenia.bookeditor.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.BasicAuth;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.InMemorySwaggerResourcesProvider;
import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2

// spring boot 2.x and springfox-data-rest do not work together, migrate to springfox 3.0.0-SNAPSHOT
//@EnableSwagger2WebMvc
//@Import({SpringDataRestConfiguration.class})
public class SwaggerConfig {

	List<SecurityReference> basicAuthReference() {
		SecurityReference securityReference = SecurityReference.builder()
				.reference("basicAuth")
				.scopes(new AuthorizationScope[0])
				.build();

		return Arrays.asList(securityReference);
	}

	List<SecurityContext> securityContexts(List<SecurityReference> securityReferences) {
		List<SecurityContext> securityContexts = new ArrayList<>(1);
		securityContexts.add(SecurityContext.builder().securityReferences(securityReferences).build());

		return securityContexts;
	}

	List<SecurityScheme> securitySchemes(List<SecurityReference> securityReferences) {
		ArrayList<SecurityScheme> securitySchemes = new ArrayList<>(1);
		securitySchemes.add(new BasicAuth("basicAuth"));

		return securitySchemes;
	}

	@Primary
	@Bean
	public SwaggerResourcesProvider swaggerResourcesProvider(InMemorySwaggerResourcesProvider defaultResourcesProvider) {
		return () -> {
			SwaggerResource wsResource = new SwaggerResource();
			wsResource.setName("spring data rest manual api");
			wsResource.setSwaggerVersion("2.0");
			wsResource.setLocation("/swagger2-spring-data-rest-api.json");

			List<SwaggerResource> resources = new ArrayList<>(defaultResourcesProvider.get());
			resources.add(wsResource);
			return resources;
		};
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.securitySchemes(securitySchemes(basicAuthReference()))
				.securityContexts(securityContexts(basicAuthReference()))
				.groupName("spring-boot-controllers")
				.select()
				.apis(RequestHandlerSelectors.basePackage("es.ingenia.bookeditor"))
				.paths(PathSelectors.any())
				.build();
	}
}