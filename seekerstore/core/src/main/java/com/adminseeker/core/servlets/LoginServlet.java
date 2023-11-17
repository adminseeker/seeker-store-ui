package com.adminseeker.core.servlets;

import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;
import com.adminseeker.apis.bo.SignupRequest;
import com.adminseeker.apis.services.AuthService;
import com.adminseeker.core.utils.CookieUtilService;
import com.google.gson.Gson;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;


import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;


@Component(service = Servlet.class, immediate = true)
@SlingServletResourceTypes(
        resourceTypes={"seekerstore/components/login","seekerstore/components/signup"},
        methods=HttpConstants.METHOD_POST,
        selectors = {"login","signup"},
        extensions="json")
@ServiceDescription("Login Servlet")
public class LoginServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    @Reference
    private transient AuthService authService;

    @Reference
    private transient CookieUtilService cookieService;


    @Override
    protected void doPost(final SlingHttpServletRequest request,
            final SlingHttpServletResponse response) throws ServletException, IOException {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String selector = request.getRequestPathInfo().getSelectorString();
            AuthResponse authResponse = null;
            if(selector.equals("login")){
                AuthRequest authRequest = new AuthRequest();
                authRequest.setUsername(request.getParameter("username"));
                authRequest.setPassword(request.getParameter("password"));
                authResponse = authService.getToken(authRequest);
            }else if(selector.equals("signup")){
                SignupRequest signupRequest = new SignupRequest();
                signupRequest.setName(request.getParameter("name"));
                signupRequest.setEmail(request.getParameter("email"));
                signupRequest.setPassword(request.getParameter("password"));
                signupRequest.setPhone(request.getParameter("phone"));
                signupRequest.setRole(request.getParameter("role"));
                authResponse = authService.getTokenOnRegister(signupRequest);
            }
            if(StringUtils.isNotEmpty(authResponse.getToken())){
                cookieService.createSimpleCookie(response, "access-token",authResponse.getToken());
            }
            String jsonString = gson.toJson(authResponse, AuthResponse.class);
            response.getWriter().print(jsonString);
        
    }
}
