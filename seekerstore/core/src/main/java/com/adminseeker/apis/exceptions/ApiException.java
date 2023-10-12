package com.adminseeker.apis.exceptions;

import lombok.Getter;

@Getter
public class ApiException extends Exception{
    private String msg;
    private Integer statusCode;
    public ApiException(String msg, Integer statusCode){
        super(msg);
        this.msg=msg;
        this.statusCode=statusCode;
    }
}
