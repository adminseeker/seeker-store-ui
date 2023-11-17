package com.adminseeker.apis.services;


import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;
import com.adminseeker.apis.bo.SignupRequest;
import com.adminseeker.apis.exceptions.ApiException;

import feign.RequestLine;

public interface AuthServiceApi {
    
    @RequestLine("POST /authservice/api/v1/auth/login")
    AuthResponse getToken(AuthRequest authRequest) throws ApiException;

    @RequestLine("POST /authservice/api/v1/auth/register")
    AuthResponse getTokenOnRegister(SignupRequest signupRequest) throws ApiException;
}
