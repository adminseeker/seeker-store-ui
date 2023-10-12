package com.adminseeker.apis.services;

import org.apache.commons.lang.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

import com.adminseeker.apis.bo.UserProfile;
import com.adminseeker.apis.exceptions.ApiException;
import com.adminseeker.apis.utils.CustomErrorDecoder;
import com.drew.lang.annotations.Nullable;

import feign.Feign;
import feign.Feign.Builder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Component(service = UserService.class,immediate = true)
@Designate(ocd = ApiRestConfig.class)
@Slf4j
public class UserService {
    
    private UserServiceApi api;
    private Builder apiBuilder;
    private ApiRestConfig apiConfig;
    @Getter
    @Setter
    private String token;

    @Activate
    public void activate(final ApiRestConfig config){
        this.apiConfig=config;
        this.apiBuilder = 
                     
                        Feign.builder()
                            .encoder(new JacksonEncoder())
                            .decoder(new JacksonDecoder())
                            .errorDecoder(new CustomErrorDecoder())
                            .requestInterceptor(request -> request.header("Content-Type","application/json"))
                            .requestInterceptor(request -> request.header("Source-Application",config.sourceApplication()));
                            // .target(UserServiceApi.class, apiConfig.seekerStoreApiEndPointUrl())
                    // :
                    //     Feign.builder()
                    //         .encoder(new JacksonEncoder())
                    //         .decoder(new JacksonDecoder())
                    //         .errorDecoder(new CustomErrorDecoder())
                    //         .requestInterceptor(request -> request.header("Content-Type","application/json"))
                    //         .requestInterceptor(request -> request.header("Source-Application",config.sourceApplication()));
                            // .requestInterceptor(request -> request.header("Authorization","Bearer "+this.token))
                            // .target(UserServiceApi.class, apiConfig.seekerStoreApiEndPointUrl());
    }

    @Nullable
    public UserProfile getUserProfile(){
        try{
            this.api = this.apiBuilder
                .requestInterceptor(request -> request.header("Authorization","Bearer "+this.token))
                .target(UserServiceApi.class, apiConfig.seekerStoreApiEndPointUrl());
            return this.api.getUserProfile();
        }catch (final ApiException e){
            log.error("User Profile API Error",e);
            UserProfile userProfile = new UserProfile();
            userProfile.setMsg(e.getMsg());
            userProfile.setStatusCode(e.getStatusCode());
            return userProfile;
        }
    }
}
