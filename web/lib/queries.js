export const config = `
  {
    "settings": *[_id == "settingsGeneral"][0] {
      title,
      url,
      "logo": {
        "url": logo.asset->url,
        "metadata": logo.asset->metadata,
      },
      "logoLight": {
        "url": logoLight.asset->url,
        "metadata": logoLight.asset->metadata,
      },
      "openGraphImage": openGraphImage.asset->url,
      phoneNumber,
      email,
      "api": *[_id == "settingsApi"][0] {
        facebookPageId,
        googleTagmanagerId,
        instagramClientToken,
        mailchimpActionUrl,
      },
    },
    "header": *[_id == "settingsHeader"][0] {
      "logo": {
        "url": logo.asset->url,
        "metadata": logo.asset->metadata,
      },
      "button": {
        "text": buttonText,
        "link": buttonLink->slug.current,
      },
      "navigation": navigation[] -> { 
        _id,
        title,
        "url": slug.current,
      },
    },
    "footer": *[_id == "settingsFooter"][0] {
      copyright[] {
        ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "url": @.reference->slug.current,
          }
        }
      },
      contactOptions[] {
        _key,
        title,
        link,
        "icon": icon.asset->url,
      }
    },
    
  }
`

export const getSitemap = `
  *[_type in ["page", "post", "travel"] && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current,
  }
`

export const getPageContent = `
  *[_type in ["page", "post", "travel"] && slug.current == $slug]{
    ...,
    "breadcrumbs": *[_type in ["page", "post", "travel"] && slug.current in $slugArray] {
      "slug": slug.current,
      "title": select(
          _type == "page" => title,
          _type == "post" => title,
          _type == "travel" => name,
      )
    },
    heroBackground != null => {
      "heroBackground": {
        "url": heroBackground.asset->url,
        "metadata": heroBackground.asset->metadata,
      },
    },
    image != null => {
      "image": {
        "alt": image.alt,
        "url": image.asset->url,
        "metadata": image.asset->metadata,
      },
    },
    _type == "travel" => {
      "destination": destination->name,
    },
    content[] {
      ...,
      ctas != null => {
        ctas[] {
          ...,
          "link": select(
            link != null => link,
            page->slug.current,
          ),
        },
      },
      image != null => {
        "image": {
          "alt": image.alt,
          "url": image.asset->url,
          "metadata": image.asset->metadata,
        },
      },
      background != null => {
        "background": background.asset->url
      },
      _type == "hero" => {
        ...,
        "background": background.asset->url,
        featuredTravels != null => {
          "featuredTravels": featuredTravels[] -> {
            _id,
            "image": {
              "url": heroBackground.asset->url,
              "metadata": heroBackground.asset->metadata,
            },
            "title": heroHeading,
            "url": slug.current,
          }
        }
      },
      _type == "textblock" => {
        ...,
        content[] {
          ...,
          markDefs[] {
            ...,
            _type == "internalLink" => {
              "url": @.reference->slug.current,
            }
          },
          _type == "figure" => {
            "image": {
              "alt": alt,
              "url": asset->url,
              "metadata": asset->metadata,
            }
          }
        }
      },
      _type == "textColumns" => {
        ...,
        content[] {
          ...,
          text[] {
            ...,
            markDefs[] {
              ...,
              _type == "internalLink" => {
                "url": @.reference->slug.current,
              }
            },
            _type == "figure" => {
              "image": {
                "alt": alt,
                "url": asset->url,
                "metadata": asset->metadata,
              }
            }
          }
        }
      },
      _type == "faq" => {
        ...,
        questions[] {
          ...,
          answer[] {
            ...,
            markDefs[] {
              ...,
              _type == "internalLink" => {
                "url": @.reference->slug.current,
              }
            }
          }
        }
      },
      _type == "imageGallery" => {
        ...,
        images[] {
          _key,
          "url": asset->url,
          alt,
          "metadata": asset->metadata,
        }
      },
      _type == "articles" => {
        ...,
        "posts": select(
          type == "all" => *[_type == "post"] | order(_createdAt desc) {
            title,
            "url": slug.current,
            "image": {
              "url": image.asset->url,
              "alt": image.alt,
              "metadata": image.asset->metadata,
            }
          },
          type == "newest" => *[_type == "post"] | order(_createdAt desc) [0...6] {
            title,
            "url": slug.current,
            "image": {
              "url": image.asset->url,
              "alt": image.alt,
              "metadata": image.asset->metadata,
            }
          },
          type == "selected" => selected[] -> {
            title,
            "url": slug.current,
            "image": {
              "url": image.asset->url,
              "alt": image.alt,
              "metadata": image.asset->metadata,
            }
          },
        )
      },
      _type == "destinations" => {
        ...,
        "destinations": select(
          type == "all" => *[_type == "destination"] | order(name desc) {
            name,
            "image": {
              "url": image.asset->url,
              "alt": image.alt,
              "metadata": image.asset->metadata,
            },
            "url": connectedPage->slug.current,
          },
          type == "selected" => selected[] -> {
            name,
            "image": {
              "url": image.asset->url,
              "alt": image.alt,
              "metadata": image.asset->metadata,
            },
            "url": connectedPage->slug.current,
          },
        )
      },
      _type == "travelCalendar" => {
        ...,
        "travels": select(
          type == "all" => *[_type == "travel"] {
            ...,
            dates[] {
              ...,
              "name": ^.heroHeading,
              "url": ^.slug.current,
              "image": {
                "url": ^.heroBackground.asset->url,
                "metadata": ^.heroBackground.asset->metadata,
              }
            },
          },
          type == "destination" => *[_type == "travel" && destination._ref == ^.destination._ref] {
            ...,
            dates[] {
              ...,
              "name": ^.heroHeading,
              "url": ^.slug.current,
              "image": {
                "url": ^.heroBackground.asset->url,
                "metadata": ^.heroBackground.asset->metadata,
              }
            },
          }
        )
      },
      _type == "travelProgram" => {
        ...,
        generalInformation[] {
          ...,
          markDefs[] {
            ...,
            _type == "internalLink" => {
              "url": @.reference->slug.current,
            }
          },
          _type == "figure" => {
            "image": {
              "alt": alt,
              "url": asset->url,
              "metadata": asset->metadata,
            },
          },
        }
      },
    }
  }
`

export const getPageSlugs = `
  *[_type in ["page", "post", "travel"] && defined(slug.current)].slug.current
`
