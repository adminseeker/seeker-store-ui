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

@Model(adaptables = SlingHttpServletRequest.class, adapters = {SignupModel.class, ComponentExporter.class},
    resourceType = SignupModel.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SignupModel implements ComponentExporter{

    static final String RESOURCE_TYPE = "seekerstore/components/signup";

    @ValueMapValue
    @Getter @Setter
    private String role;

    @ValueMapValue
    @Getter @Setter
    private String signupTitle;

    @ValueMapValue
    @Getter @Setter
    private String firstNameLabel;

    @ValueMapValue
    @Getter @Setter
    private String lastNameLabel;

    @ValueMapValue
    @Getter @Setter
    private String emailAddressLabel;

    @ValueMapValue
    @Getter @Setter
    private String invalidEmailError;

    @ValueMapValue
    @Getter @Setter
    private String regesiteredEmailError;
    
    @ValueMapValue
    @Getter @Setter
    private String passwordLabel;

    @ValueMapValue
    @Getter @Setter
    private String confirmPasswordLabel;

    @ValueMapValue
    @Getter @Setter
    private String minimumPasswordLength;

    @ValueMapValue
    @Getter @Setter
    private String invalidPasswordError;

    @ValueMapValue
    @Getter @Setter
    private String passwordMismatchError;

    @ValueMapValue
    @Getter @Setter
    private String phoneLabel;

    @ValueMapValue
    @Getter @Setter
    private String invalidPhoneError;

    @ValueMapValue
    @Getter @Setter
    private String submitButtonLabel;


    @ValueMapValue
    @Getter @Setter
    private String signinLinkLabel;

    @ValueMapValue
    @Getter @Setter
    private String signinLink;

    @ValueMapValue
    @Getter @Setter
    private String dashboardLink;

    @ValueMapValue
    @Getter @Setter
    private String genericError;

    @Override
    public String getExportedType() {return SignupModel.RESOURCE_TYPE ;}

}
