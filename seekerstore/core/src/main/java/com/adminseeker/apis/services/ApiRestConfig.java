package com.adminseeker.apis.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 * Seeker Store API Config Service
 */
@ObjectClassDefinition(name = "Seeker Store API Rest Configurations", description = "Seeker Store API REST Configurations will Provides the End Ponit URl For all Service")
public @interface ApiRestConfig {

	@AttributeDefinition(name = "Source Application", description = "This holds the value of Source Application", type = AttributeType.STRING)
	String sourceApplication() default "AEM";

	@AttributeDefinition(name = "Seeker Store API Endpoint URL", description = "This holds the value of Seeker Store API endpoint", type = AttributeType.STRING)
	String seekerStoreApiEndPointUrl() default "https://dev-apis.seeker-store.k8s.aravindweb.com";

	@AttributeDefinition(name = "Create Token Path for API", description = "This holds the value of Create Token Path for API", type = AttributeType.STRING)
	String createTokenPath() default "/authservice/api/v1/auth/login";

    @AttributeDefinition(name = "Get User Profile Api Path", description = "This holds the value of Get User Profile Api Path", type = AttributeType.STRING)
	String getUserProfile() default "/userservice/api/v1/users/me";

	
	
}