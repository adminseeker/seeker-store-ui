package com.adminseeker.core.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.service.component.annotations.Component;

@Component(service = CookieUtilService.class, immediate = true)
public class CookieUtilService {
    
    /**
	 * Creates the cookie.
	 *
	 * @param response   the response
	 * @param cookieName the cookie name
	 * @param val        the val
	 */
	public void createSimpleCookie(HttpServletResponse response, String cookieName, String val) {
		String safeValue = val.replaceAll("\n", "").replaceAll("\r", "");
		Cookie userCookie = new Cookie(cookieName, StringEscapeUtils.escapeJava(safeValue));
		userCookie.setPath("/");
		// userCookie.setMaxAge(config.getUserNameTokenExpiryTime() == -1 ? config.getUserNameTokenExpiryTime() : (config.getUserNameTokenExpiryTime()) / 1000);
		response.addCookie(userCookie);
	}

    /**
	 * Gets the cookie.
	 *
	 * @param request the request
	 * @param name    the name
	 * @return the cookie
	 */
	public Cookie getCookieByName(SlingHttpServletRequest request, final String name) {
		return request.getCookie(name);
	}
	
	public Cookie getCookie(HttpServletRequest request, final String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
		 for (Cookie cookie : cookies) {
		   if (cookie.getName().equals(name)) {
		      return cookie;
		    }
		  }
		}
		return null;
	}

	public void clearCookieByName(String cookieName, SlingHttpServletResponse response) {
		Cookie cookie = new Cookie(cookieName, StringUtils.EMPTY);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}
    
}
