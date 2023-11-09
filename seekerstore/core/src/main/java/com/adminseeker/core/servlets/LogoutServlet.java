package com.adminseeker.core.servlets;

import com.adminseeker.apis.bo.AuthRequest;
import com.adminseeker.apis.bo.AuthResponse;
import com.adminseeker.apis.services.AuthService;
import com.adminseeker.core.utils.CookieUtilService;
import com.google.gson.Gson;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.propertytypes.ServiceDescription;


import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import org.osgi.framework.Constants;

@Component(service = Servlet.class, 
        property = { 
            Constants.SERVICE_DESCRIPTION + "=Logout servlet", 
            ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET, 
            ServletResolverConstants.SLING_SERVLET_PATHS + "="+ "/bin/seekerstore/logout"
		},immediate=true)
@ServiceDescription("Logout Servlet")
public class LogoutServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = 1L;

    @Reference
    private transient AuthService authService;

    @Reference
    private transient CookieUtilService cookieService;


    @Override
    protected void doGet(final SlingHttpServletRequest request,
            final SlingHttpServletResponse response) throws ServletException, IOException {
            if(cookieService.getCookieByName(request, "access-token")!=null){
                cookieService.clearCookieByName("access-token",response);
            }
            response.sendRedirect("/");
    }
}
