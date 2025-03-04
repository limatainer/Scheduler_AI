import React from 'react';
import { Helmet } from 'react-helmet-async';

// SEO metadata component
export const SEO = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
  additionalLinkTags = [],
}) => {
  // Default metadata values
  const defaultTitle = 'Scheduler App - Manage Your Appointments Efficiently';
  const defaultDescription =
    'Schedule and manage appointments, meetings, and events with our easy-to-use scheduling software. Perfect for businesses and individuals.';
  const defaultCanonical = window.location.origin + window.location.pathname;

  // Merge provided values with defaults
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    canonical: canonical || defaultCanonical,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical || defaultCanonical,
      title: title || defaultTitle,
      description: description || defaultDescription,
      site_name: 'Scheduler App',
      images: [
        {
          url: `${window.location.origin}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Scheduler App',
        },
      ],
      ...openGraph,
    },
    twitter: {
      handle: '@schedulerapp',
      site: '@schedulerapp',
      cardType: 'summary_large_image',
      ...twitter,
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:url" content={seo.openGraph.url} />
      <meta property="og:title" content={seo.openGraph.title} />
      <meta property="og:description" content={seo.openGraph.description} />
      <meta property="og:site_name" content={seo.openGraph.site_name} />
      {seo.openGraph.images?.map((image, index) => (
        <React.Fragment key={`og-image-${index}`}>
          <meta property="og:image" content={image.url} />
          {image.width && (
            <meta property="og:image:width" content={image.width.toString()} />
          )}
          {image.height && (
            <meta
              property="og:image:height"
              content={image.height.toString()}
            />
          )}
          {image.alt && <meta property="og:image:alt" content={image.alt} />}
        </React.Fragment>
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitter.cardType} />
      <meta name="twitter:site" content={seo.twitter.site} />
      <meta name="twitter:creator" content={seo.twitter.handle} />
      <meta name="twitter:title" content={seo.openGraph.title} />
      <meta name="twitter:description" content={seo.openGraph.description} />
      {seo.openGraph.images?.[0] && (
        <meta name="twitter:image" content={seo.openGraph.images[0].url} />
      )}
      {seo.openGraph.images?.[0]?.alt && (
        <meta name="twitter:image:alt" content={seo.openGraph.images[0].alt} />
      )}

      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={`meta-tag-${index}`} {...tag} />
      ))}

      {/* Additional Link Tags */}
      {additionalLinkTags.map((tag, index) => (
        <link key={`link-tag-${index}`} {...tag} />
      ))}
    </Helmet>
  );
};

// Helper function to create structured data for better SEO
export const createStructuredData = (type, data) => {
  let structuredData = {};

  switch (type) {
    case 'Organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Scheduler App',
        url: window.location.origin,
        logo: `${window.location.origin}/logo.png`,
        sameAs: [
          'https://twitter.com/schedulerapp',
          'https://facebook.com/schedulerapp',
          'https://linkedin.com/company/schedulerapp',
        ],
        ...data,
      };
      break;

    case 'WebSite':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Scheduler App',
        url: window.location.origin,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        ...data,
      };
      break;

    case 'BreadcrumbList':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      break;

    case 'Event':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        location: {
          '@type': 'Place',
          name: data.locationName,
          address: data.locationAddress,
        },
        description: data.description,
        organizer: {
          '@type': 'Organization',
          name: data.organizerName,
          url: data.organizerUrl,
        },
        ...data,
      };
      break;

    default:
      structuredData = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
      };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// PageSEO component for easy implementation on each page
export const PageSEO = ({
  title,
  description,
  path = '',
  structuredDataType = null,
  structuredData = null,
}) => {
  const canonical = `${window.location.origin}${
    path || window.location.pathname
  }`;

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      {structuredDataType &&
        structuredData &&
        createStructuredData(structuredDataType, structuredData)}
    </>
  );
};
