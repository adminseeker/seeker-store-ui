package com.adminseeker.apis.bo;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String msg;
    private Integer statusCode;
}
