package com.felix.servers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.felix.servers.enumeration.Status;
import com.felix.servers.model.Server;
import com.felix.servers.repo.ServerRepo;

@SpringBootApplication
public class ServersApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServersApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ServerRepo serverRepo){
		return args -> {
			serverRepo.save(new Server(null, "192.168.1.160", "Ubuntu Linux", 
			"16 GB", "Personal PC"," http://localhost:8080/server/image/server1.png", Status.SERVER_UP));

			serverRepo.save(new Server(null, "192.168.1.58", "Fedora Linux", 
			"16 GB", "Dell PC"," http://localhost:8080/server/image/server2.png", Status.SERVER_DOWN));

			serverRepo.save(new Server(null, "192.168.1.21", "MS 2008", 
			"32 GB", "Mail Server"," http://localhost:8080/server/image/server3.png", Status.SERVER_UP));

			serverRepo.save(new Server(null, "192.168.1.14", "Arch Linux", 
			"64 GB", "Web Server"," http://localhost:8080/server/image/server4.png", Status.SERVER_DOWN));
		};
	}
}
