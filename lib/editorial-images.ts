/** Curated Unsplash URLs — fictional demo only, coherent salon editorial set. */

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const editorialImages = {
  hero: u("1560066984-138dadb4c035", 2400),
  studio: u("1521590839618-b7893dba908c", 1200),
  bookingAccent: u("1516975080664-ed2fc6a32983", 1600),
  services: {
    coupe: u("1522337360788-8eee3854e087", 900),
    color: u("1595476109371-b48070e0fe2e", 900),
    balayage: u("1633681923009-990c3aa325d6", 900),
    blowout: u("1487412947147-5cebf100ffc2", 900),
    consult: u("1562322140-8baeececf3df", 900),
  } as Record<string, string>,
  professionals: {
    emma: u("1580618672580-2a4bbff6fe86", 800),
    sofia: u("1494790108377-be9c29b29330", 800),
    mia: u("1438761681033-6461ffad8d80", 800),
  } as Record<string, string>,
};

export function serviceImage(serviceId: string) {
  return editorialImages.services[serviceId] ?? editorialImages.hero;
}

export function professionalImage(professionalId: string) {
  return editorialImages.professionals[professionalId] ?? editorialImages.hero;
}
