export default function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://techhilfepro.de/#organization',
    name: 'Tech Hilfe Pro',
    legalName: 'Tech Hilfe Pro - Inhaber: José Carlos Martin Lache',
    description: 'Professioneller IT-Support für Privatkunden und Kleinunternehmen in NRW. Sicher, verständlich und immer für Sie da.',
    url: 'https://techhilfepro.de',
    logo: {
      '@type': 'ImageObject',
      url: 'https://techhilfepro.de/logo.png',
      width: 512,
      height: 512
    },
    image: 'https://techhilfepro.de/og-image.jpg',
    telephone: '+4915565029989',
    email: 'info@techhilfepro.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Schirmerstr. 7',
      addressLocality: 'Köln',
      postalCode: '50823',
      addressRegion: 'NRW',
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.9503,
      longitude: 6.9328
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Köln',
        '@id': 'https://www.wikidata.org/wiki/Q365'
      },
      {
        '@type': 'City',
        name: 'Düsseldorf',
        '@id': 'https://www.wikidata.org/wiki/Q1718'
      },
      {
        '@type': 'City',
        name: 'Neuss',
        '@id': 'https://www.wikidata.org/wiki/Q3920'
      },
      {
        '@type': 'State',
        name: 'Nordrhein-Westfalen',
        '@id': 'https://www.wikidata.org/wiki/Q1198'
      }
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Kreditkarte, SEPA-Lastschrift, Rechnung',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://github.com/clouitreee/tech-hilfe-pro-nrw'
    ],
    founder: {
      '@type': 'Person',
      name: 'José Carlos Martin Lache'
    },
    foundingDate: '2025',
    slogan: 'Ihr persönlicher IT-Partner für ein sicheres digitales Leben und Arbeiten',
    serviceType: [
      'IT-Support',
      'Computer-Reparatur',
      'Netzwerk-Installation',
      'IT-Beratung',
      'Digitalisierung',
      'Cybersecurity',
      'Cloud-Services',
      'Remote-Support'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT-Support Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital-Sorglos-Paket Basis',
            description: 'Grundlegender IT-Support für Privatkunden',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Tech Hilfe Pro'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital-Sorglos-Paket Premium',
            description: 'Umfassender IT-Support mit Vor-Ort-Service',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Tech Hilfe Pro'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business-Grundschutz',
            description: 'IT-Support für Kleinunternehmen',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Tech Hilfe Pro'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business-Wachstum',
            description: 'Erweiterte IT-Betreuung für wachsende Unternehmen',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Tech Hilfe Pro'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business-Partner Premium',
            description: 'Vollumfängliche IT-Partnerschaft für Unternehmen',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Tech Hilfe Pro'
            }
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
