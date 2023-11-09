package com.adminseeker.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.Getter;
import lombok.Setter;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {LoginModel.class, ComponentExporter.class},
    resourceType = LoginModel.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LoginModel implements ComponentExporter{

    static final String RESOURCE_TYPE = "seekerstore/components/login";

    @ValueMapValue
    @Getter @Setter
    private String usernameLabel;
    
    @ValueMapValue
    @Getter @Setter
    private String passwordLabel;

    @ValueMapValue
    @Getter @Setter
    private String submitButtonLabel;

    @ValueMapValue
    @Getter @Setter
    private String forgotPasswordLinkLabel;

    @ValueMapValue
    @Getter @Setter
    private String forgotPasswordLink;

    @ValueMapValue
    @Getter @Setter
    private String signUpLinkLabel;

    @ValueMapValue
    @Getter @Setter
    private String signUpLink;

    @ValueMapValue
    @Getter @Setter
    private String dashboardLink;

    @Override
    public String getExportedType() {return LoginModel.RESOURCE_TYPE ;}

}
