package com.adminseeker.core.servlets;

import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;
import com.adminseeker.apis.services.AuthService;
import com.google.gson.Gson;

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
        resourceTypes="seekerstore/components/login",
        methods=HttpConstants.METHOD_POST,
        selectors = "login",
        extensions="json")
@ServiceDescription("Login Servlet")
public class LoginServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    @Reference
    private transient AuthService authService;


    @Override
    protected void doPost(final SlingHttpServletRequest request,
            final SlingHttpServletResponse response) throws ServletException, IOException {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            AuthRequest authRequest = new AuthRequest();
            authRequest.setUsername(request.getParameter("username"));
            authRequest.setPassword(request.getParameter("password"));
            AuthResponse authResponse = authService.getToken(authRequest);
            String jsonString = gson.toJson(authResponse, AuthResponse.class);
            response.getWriter().print(jsonString);
        
    }
}
