package com.adminseeker.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = {LoginModel.class, ComponentExporter.class},
    resourceType = LoginModel.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LoginModel implements ComponentExporter{

    static final String RESOURCE_TYPE = "seekerstore/components/login";

    @ValueMapValue
    private String usernameLabel;
    
    @ValueMapValue
    private String passwordLabel;

    @ValueMapValue
    private String submitButtonLabel;


    public String getUsernameLabel() {
        return usernameLabel;
    }


    public void setUsernameLabel(String usernameLabel) {
        this.usernameLabel = usernameLabel;
    }


    public String getPasswordLabel() {
        return passwordLabel;
    }

    public void setPasswordLabel(String passwordLabel) {
        this.passwordLabel = passwordLabel;
    }

    public String getSubmitButtonLabel() {
        return submitButtonLabel;
    }


    public void setSubmitButtonLabel(String submitButtonLabel) {
        this.submitButtonLabel = submitButtonLabel;
    }


    @Override
    public String getExportedType() {return LoginModel.RESOURCE_TYPE ;}

}
