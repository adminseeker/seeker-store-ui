package com.adminseeker.apis.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

import org.apache.commons.lang.StringUtils;

import com.adminseeker.apis.bo.ErrorMessage;
import com.adminseeker.apis.exceptions.ApiException;
import com.google.gson.Gson;

import feign.Response;
import feign.codec.ErrorDecoder;

public class CustomErrorDecoder implements ErrorDecoder {

  private final ErrorDecoder errorDecoder = new Default();

  @Override
  public Exception decode(String methodKey, Response response) {
    String body = null;
    String msg = null;
    try {
        body = new BufferedReader(response.body().asReader(StandardCharsets.UTF_8))
          .lines()
          .collect(Collectors.joining("\n"));
          ErrorMessage errorMessage = new Gson().fromJson(body, ErrorMessage.class); 
          msg = StringUtils.isNotEmpty(errorMessage.getMsg()) ? errorMessage.getMsg()  : errorMessage.getError() ; 
    } catch (IOException ignore) {}


    return StringUtils.isNotEmpty(msg) ? new ApiException(msg,response.status()) : errorDecoder.decode(methodKey, response);
  }
}