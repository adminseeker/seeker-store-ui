package com.adminseeker.apis.services;

import org.apache.commons.lang.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

import com.adminseeker.apis.bo.ApiAccessToken;
import com.adminseeker.apis.bo.UserProfile;
import com.drew.lang.annotations.Nullable;

import feign.Feign;
import feign.jackson.JacksonDecoder;
import lombok.extern.slf4j.Slf4j;

@Component(service = AuthService.class)
@Designate(ocd = ApiRestConfig.class)
@Slf4j
public class UserService {
    
    private UserServiceApi api;
    private ApiRestConfig apiConfig;
    private String token;

    public UserService(ApiAccessToken accessToken){
        this.token = accessToken.getToken();
    }

    @Activate
    public void activate(final ApiRestConfig config){
        this.apiConfig=config;
        this.api = StringUtils.isEmpty(this.token) 
                    ?  
                        Feign.builder()
                            .decoder(new JacksonDecoder())
                            .errorDecoder(UserServiceApi.UserServiceApiException::new)
                            .requestInterceptor(request -> request.header("Source-Application",config.sourceApplication()))
                            .target(UserServiceApi.class, apiConfig.seekerStoreApiEndPointUrl())
                    :
                        Feign.builder()
                            .decoder(new JacksonDecoder())
                            .errorDecoder(UserServiceApi.UserServiceApiException::new)
                            .requestInterceptor(request -> request.header("Source-Application",config.sourceApplication()))
                            .requestInterceptor(request -> request.header("Authorization","Bearer "+this.token))
                            .target(UserServiceApi.class, apiConfig.seekerStoreApiEndPointUrl());
    }

    @Nullable
    public UserProfile getUserProfile(ApiAccessToken token){
        try{
            return this.api.getUserProfile(token);
        }catch (final UserServiceApi.UserServiceApiException e){
            log.error("User Profile Error",e);
        }
        return null;
    }
}
