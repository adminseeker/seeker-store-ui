package com.adminseeker.apis.services;

import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;

import feign.RequestLine;
import feign.Response;

public interface AuthServiceApi {
    
    @RequestLine("POST /authservice/api/v1/auth/login")
    AuthResponse getToken(AuthRequest authRequest) throws AuthServiceApiException;

    class AuthServiceApiException extends Exception {

        private static final long serialVersionUID = 1L;

        public AuthServiceApiException(final String methodKey, final Response response){
            super(String.format("http status for %s was %s", methodKey, response.status()));
        }
    }
}
