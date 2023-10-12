package com.adminseeker.apis.services;

import com.adminseeker.apis.bo.UserProfile;
import com.adminseeker.apis.exceptions.ApiException;

import feign.RequestLine;

public interface UserServiceApi {
    
    @RequestLine("GET /userservice/api/v1/users/me")
    UserProfile getUserProfile() throws ApiException;

}
