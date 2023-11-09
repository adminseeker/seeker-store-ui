package com.adminseeker.core.servlets;

import com.adminseeker.apis.bo.UserProfile;
import com.adminseeker.apis.services.UserService;
import com.adminseeker.core.utils.CookieUtilService;
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
        resourceTypes="seekerstore/components/profile",
        methods=HttpConstants.METHOD_POST,
        selectors = "profile",
        extensions="json")
@ServiceDescription("UserService Servlet")
public class UserServiceServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    @Reference
    private transient UserService userService;

    @Reference
    private transient CookieUtilService cookieService;

    @Override
    protected void doPost(final SlingHttpServletRequest request,
            final SlingHttpServletResponse response) throws ServletException, IOException {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            String token = null;
            if(cookieService.getCookieByName(request, "access-token")!=null){
                token = cookieService.getCookieByName(request, "access-token").getValue();
            }
            userService.setToken(token);
            String selector = request.getRequestPathInfo().getSelectorString();
            String jsonString=null;
            if(selector.equals("profile")){
                UserProfile userProfile = userService.getUserProfile();
                jsonString = gson.toJson(userProfile, UserProfile.class);
            }
            response.getWriter().print(jsonString);
        
    }
}
