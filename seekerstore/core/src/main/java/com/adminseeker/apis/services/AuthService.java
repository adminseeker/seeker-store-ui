package com.adminseeker.apis.services;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;
import com.drew.lang.annotations.Nullable;

import feign.Feign;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import lombok.extern.slf4j.Slf4j;

@Component(service = AuthService.class,immediate = true)
@Designate(ocd = ApiRestConfig.class)
@Slf4j
public class AuthService {
    
    private AuthServiceApi api;

    @Activate
    public void activate(final ApiRestConfig config){
        this.api = Feign.builder()
                        .encoder(new JacksonEncoder())
                        .decoder(new JacksonDecoder())
                        .errorDecoder(AuthServiceApi.AuthServiceApiException::new)
                        .requestInterceptor(request -> request.header("Content-Type","application/json"))
                        .requestInterceptor(request -> request.header("Source-Application",config.sourceApplication()))
                        .target(AuthServiceApi.class, config.seekerStoreApiEndPointUrl());
    }

    @Nullable
    public AuthResponse getToken(AuthRequest authRequest){
        try{
            return this.api.getToken(authRequest);
        }catch (final AuthServiceApi.AuthServiceApiException e){
            log.error("API Access Token Error",e);
        }
        return null;
    }
}
