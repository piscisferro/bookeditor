
# Precondition

- Git 2
- JDK 1.8
- Node.js 10
- Docker 18
- Docker Compose 1.20

Then install angular-cli with command

	npm install -g @angular/cli
	
Your can install [Docker Toolbox on Windows](https://docs.docker.com/toolbox/toolbox_install_windows/). This package include docker, docker-machine, docker-compose and virtual box.


# Development

Run backend in development mode:

	./mvnw spring-boot:run
	
API URL in development mode *http://localhost:8080/bookeditor/api/*	


Run frontend in development mode

	cd client
	ng serve
	
client URL in development mode *http://localhost:4200/bookeditor*		

First time you must run

	cd client
	npm install

or 

	cd client
	pnpm install	
	
Login in *http://localhost:4200/bookeditor*	with this credentials (from BootstrapDataPopulator):

- administrator: 
    - admin/admin
- authors: 
    - author1/author1
    - author2/author2
- authors: 
    - reviewer1/reviewer1
    - reviewer2/reviewer2
        	

# Package


Build angular client
	
	cd client
	ng build --prod
	
Create WAR file for a maven profile
	
	cd..
	./mvnw -P<maven profile name> package -Dmaven.test.skip=true
	

**maven profile name** can be:

- development (default)
- stage
- production

Do not package with maven profile `development`, will do not package angular client into WAR file.


# Configuration

Change `src/main/resources/application-<spring profile>.properties` and repackage with

	./mvnw -P<maven profile name> package
	
**maven profile name** can be:

- development (default)
- stage
- production
	

# Tests

Run integration test (`development` profile)

	./mvnw test

The test will be skips for maven profiles *production*.

To run test in `stage` profile:

	
	docker-compose -f src/main/docker/services-stage.yml up -d
	./mvnw -Pstage -Dspring.datasource.url=jdbc:mysql://192.168.99.100/bookeditor test
	
Replace 192.168.99.100 for docker machine ip:

	docker-machine ip default
	

Run angular test:

- start backend (development profile):

	./mvnw -Pdevelopment spring-boot:run
	
- start frontend

	cd client
	ng test
	

Run angular end-to-end test:

- start backend (development profile):

	./mvnw -Pdevelopment spring-boot:run
	
- start frontend

	cd client	
	node ./node_modules/protractor/bin/webdriver-manager update
	ng e2e --no-webdriver-update


`ng` can need to know where is chrome:

	# in unix
	export CHROME_BIN=<path chrome bin>
	
	# in windows
	set CHROME_BIN=<path chrome bin>
	
		


# Launch

After run commands in *Package* section, you will find a WAR file in `target/` directory.

You can deploy this file in Tomcat or launch the aplication in a embedded tomcat (using `stage` profile)  with commands:

	docker-compose -f src/main/docker/services-stage.yml up -d
	java -Dspring.profiles.active=stage -Dspring.datasource.url=jdbc:mysql://192.168.99.100/bookeditor -jar target/bookeditor.war
	
Replace 192.168.99.100 for your docker machine ip:

	docker-machine ip default
		
API URL: *http://localhost:8080/bookeditor/api*	
Client URL: *http://localhost:8080/bookeditor*


Stop app:

- `ctrl+c` to stop java
- `docker-compose -f src/main/docker/services-development.yml down` to remove db services

	
## Database

DB config can be changed by properties `spring.datasource.*` in `application-<profile>.properties`.

DB is populate in `development` spring profile by class `BootstrapDataPopulator`. 

In another spring profiles you examine database using flyway maven plugin. First start local mysql database:
 
	docker-compose -f src/main/docker/services-development.yml up -d
	
Then you can show migration state:
	
	mvnw -Dflyway.configFiles=flyway.properties  flyway:info

You can remove data (carefully) and populate data with this command

	mvnw -Dflyway.configFiles=flyway.properties  flyway:clean flyway:migrate
	
In Windows:

- get docker machine ip: `docker-machine ip default`
- modify property `flyway.url` in file  	`flyway.properties` and replace `localhost` with docker machine ip


# Docker package

	cd client
	ng build --prod
	cd ..
	mvnw  -Dmaven.test.skip=true -Pstage package
	docker build -t ingenia/bookeditor -f src/main/docker/Dockerfile .


# Docker launch

Launch image using `development` spring profile (using h2 db)

	docker stop bookeditor
	docker container rm bookeditor
	docker run --name bookeditor -p 8080:8080 --env SPRING_PROFILES_ACTIVE=development ingenia/bookeditor
	
Now you can access angular app in URL *http://192.168.99.100:8080/bookeditor*.

Replace 192.168.99.100 for docker machine ip:

	docker-machine ip default

Launch image with `stage` spring profile (and run mysql server)

	docker-compose -f src/main/docker/app-stage.yml up -d
	
Now you can access angular app in URL *http://192.168.99.100:58080/bookeditor*.

Replace 192.168.99.100 for your docker machine ip:

	docker-machine ip default
	

