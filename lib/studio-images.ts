/** Local campaign library — /public/images (see scripts/fetch-campaign-images.sh). */

export const studioImages = {
  hero: {
    salon: "/images/hero/hero-salon.jpg",
    stylist: "/images/hero/hero-stylist.jpg",
  },
  studio: {
    interior: "/images/studio/studio-interior.jpg",
    mirror: "/images/studio/studio-mirror.jpg",
    products: "/images/studio/studio-products.jpg",
  },
  details: {
    balayage: "/images/details/balayage-detail.jpg",
    texture: "/images/details/texture-glow.jpg",
  },
  services: {
    coupe: "/images/services/service-cut.jpg",
    color: "/images/services/service-color.jpg",
    balayage: "/images/services/service-balayage.jpg",
    blowout: "/images/services/service-blowout.jpg",
    consult: "/images/services/service-consultation.jpg",
  } as Record<string, string>,
  staff: {
    emma: "/images/staff/emma.jpg",
    sofia: "/images/staff/sofia.jpg",
    mia: "/images/staff/mia.jpg",
  } as Record<string, string>,
};

export function serviceImage(serviceId: string) {
  return studioImages.services[serviceId] ?? studioImages.hero.salon;
}

export function staffImage(staffId: string) {
  return studioImages.staff[staffId] ?? studioImages.hero.stylist;
}

/** @deprecated Use studio-images — kept for gradual migration */
export const editorialImages = {
  hero: studioImages.hero.salon,
  studio: studioImages.studio.interior,
  bookingAccent: studioImages.details.texture,
  services: studioImages.services,
  professionals: studioImages.staff,
};
export { serviceImage as defaultServiceImage };
