package com.adminseeker.apis.services;

import com.adminseeker.apis.bo.ApiAccessToken;
import com.adminseeker.apis.bo.UserProfile;

import feign.RequestLine;
import feign.Response;

public interface UserServiceApi {
    
    @RequestLine("GET /userservice/api/v1/users/me")
    UserProfile getUserProfile(ApiAccessToken token) throws UserServiceApiException;

    class UserServiceApiException extends Exception {

        private static final long serialVersionUID = 1L;

        public UserServiceApiException(final String methodKey, final Response response){
            super(String.format("http status for %s was %s", methodKey, response.status()));
        }
    }
}
