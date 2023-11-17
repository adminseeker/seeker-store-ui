package com.adminseeker.core.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.service.component.annotations.Reference;

import com.adminseeker.core.pojo.HeaderLink;
import com.adminseeker.core.pojo.HeaderSettingLink;
import com.adminseeker.core.utils.MultifieldReader;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, adapters = {HeaderModel.class, ComponentExporter.class},
    resourceType = HeaderModel.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Slf4j
public class HeaderModel implements ComponentExporter{

    static final String RESOURCE_TYPE = "seekerstore/components/header";

    @Getter @Setter
    private List<HeaderLink> headerLinks;

    @Getter @Setter
    private List<HeaderSettingLink> headerSettingLinks;

    @SlingObject
	private ResourceResolver resourceResolver;

    @Inject
	private Resource resource;

    @Inject
    MultifieldReader multifieldReader;

    @Inject
    @Optional
    @Via("resource")
    private Node headerSettingLinksSection;

    @ValueMapValue
    @Getter @Setter
    private String brandName;

    @Inject
    @Optional
    @Via("resource")
    private Node headerLinksSection;

    @PostConstruct
	private void init() {
        try{
            if (resourceResolver!=null) {
                String templateHeaderPath="/conf/seekerstore/settings/wcm/templates/spa-page-template/initial/jcr:content/root/header";
                InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(templateHeaderPath));
                brandName = iProperties.getInherited("brandName", String.class);
                Resource multifieldHeaderSettingLinksResource = resourceResolver.getResource(templateHeaderPath+"/headerSettingLinksSection");
                if (multifieldHeaderSettingLinksResource != null) {
                    headerSettingLinks = new ArrayList<>();
                    // Iterate over the child resources (multifield items)
                    for (Resource childResource : multifieldHeaderSettingLinksResource.getChildren()) {
                        InheritanceValueMap iChildProperties = new HierarchyNodeInheritanceValueMap(childResource);
                        HeaderSettingLink headerSettingLink = new HeaderSettingLink();
                        headerSettingLink.setLink(iChildProperties.getInherited("link", String.class));
                        headerSettingLink.setText(iChildProperties.getInherited("text", String.class));
                        headerSettingLink.setShowAfterAuth(iChildProperties.getInherited("showAfterAuth", String.class));
                        headerSettingLinks.add(headerSettingLink);
                    }
                }

                Resource multifieldHeaderLinksResource = resourceResolver.getResource(templateHeaderPath+"/headerLinksSection");
                if (multifieldHeaderLinksResource != null) {
                    headerLinks = new ArrayList<>();
                    // Iterate over the child resources (multifield items)
                    for (Resource childResource : multifieldHeaderLinksResource.getChildren()) {
                        InheritanceValueMap iChildProperties = new HierarchyNodeInheritanceValueMap(childResource);
                        HeaderLink headerLink = new HeaderLink();
                        headerLink.setLink(iChildProperties.getInherited("link", String.class));
                        headerLink.setText(iChildProperties.getInherited("text", String.class));
                        headerLink.setShowAfterAuth(iChildProperties.getInherited("showAfterAuth", String.class));
                        headerLinks.add(headerLink);
                    }
                }
        
                
            }
        } catch (Exception e) {
            log.error("Exception Occurred :: {}", e.getMessage());
        }
    }

    @Override
    public String getExportedType() {return HeaderModel.RESOURCE_TYPE ;}

}
