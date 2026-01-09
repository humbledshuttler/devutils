import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  keywords = [],
  structuredData
}) => {
  const location = useLocation();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullCanonicalUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;
    
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);

    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-seo]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      const seoScript = document.querySelector('script[type="application/ld+json"][data-seo]');
      if (seoScript) {
        seoScript.remove();
      }
    };
  }, [title, description, fullCanonicalUrl, keywords, structuredData]);

  return null;
};
