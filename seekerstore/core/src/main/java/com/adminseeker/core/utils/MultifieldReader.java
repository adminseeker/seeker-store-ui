package com.adminseeker.core.utils;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = MultifieldReader.class, immediate = true)
public class MultifieldReader {
	private static final Logger log = LoggerFactory.getLogger(MultifieldReader.class);

	public Map<String, ValueMap> multifieldNodeReader(Node parentNode, ResourceResolver resolver) {
		NodeIterator nodeIterator = null;
		LinkedHashMap<String, ValueMap> multifieldChildsMap = new LinkedHashMap<>();
		try {
			if (null != parentNode) {
				nodeIterator = parentNode.getNodes();
			}
			if (null != nodeIterator && null != resolver) {
				while (nodeIterator.hasNext()) {
					Node itemNode = nodeIterator.nextNode();
					Resource resource = resolver.getResource(itemNode.getPath());
					if (resource != null) {
						ValueMap valueMap = new ValueMapDecorator(new HashMap<>());
						valueMap.putAll(resource.getValueMap());
						multifieldChildsMap.put(itemNode.getName(), valueMap);
					}
				}
			}

		} catch (RepositoryException e) {
			log.error("Exception occurred in Multifield Reader Service {}", e.getMessage());
		}
		return multifieldChildsMap;
	}
}
