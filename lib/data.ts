import type { Appointment, AppointmentSeed, Customer, Professional, Service } from "./types";
import { addDays, startOfWeek, toISODate } from "./utils";

export const studio = {
  name: "Lumière Studio",
  city: "New York",
  address: ["48 Atelier Lane, Suite 2", "New York, NY 10013"],
  phone: "(212) 555-0148",
  email: "hello@lumiere-studio.example",
  hours: [
    { label: "Monday – Friday", value: "9:00 – 19:00" },
    { label: "Saturday", value: "9:00 – 17:00" },
    { label: "Sunday", value: "Closed" },
  ],
};

export const services: Service[] = [
  {
    id: "coupe",
    name: "Coupe & Styling",
    price: 85,
    duration: 60,
    description: "A precise cut shaped to your features, finished with a style that holds.",
    active: true,
  },
  {
    id: "color",
    name: "Color & Gloss",
    price: 180,
    duration: 120,
    description: "Full color with a luminous gloss for even tone and a clean shine.",
    active: true,
  },
  {
    id: "balayage",
    name: "Balayage",
    price: 260,
    duration: 180,
    description: "Hand-painted highlights placed for your hair, with a soft grow-out.",
    active: true,
  },
  {
    id: "blowout",
    name: "Blowout",
    price: 55,
    duration: 45,
    description: "A smooth blow-dry with movement, volume, and a polished finish.",
    active: true,
  },
  {
    id: "consult",
    name: "Consultation",
    price: 0,
    duration: 30,
    description: "A private half hour to plan a cut, a color, or a longer change.",
    active: true,
  },
];

export const professionals: Professional[] = [
  {
    id: "emma",
    name: "Emma Laurent",
    role: "Senior Stylist",
    bio: "Fifteen years of cutting hair to the face in front of her, with a calm, exacting hand.",
    focus: "Cuts, shape, and finish",
    initials: "EL",
  },
  {
    id: "sofia",
    name: "Sofia Martin",
    role: "Color Specialist",
    bio: "Paints color that looks like it arrived with the light — soft grow-out, precise tone.",
    focus: "Balayage and gloss",
    initials: "SM",
  },
  {
    id: "mia",
    name: "Mia Chen",
    role: "Beauty Specialist",
    bio: "The finish, the texture, and the unhurried last minutes of an appointment.",
    focus: "Blowouts and consultations",
    initials: "MC",
  },
];

export const customers: Customer[] = [
  { id: "sarah", firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@example.com", phone: "(212) 555-0148", totalAppointments: 6, status: "Active" },
  { id: "olivia", firstName: "Olivia", lastName: "Brown", email: "olivia.brown@example.com", phone: "(917) 555-0162", totalAppointments: 3, status: "Active" },
  { id: "amelie", firstName: "Amélie", lastName: "Moreau", email: "amelie.moreau@example.com", phone: "(646) 555-0190", totalAppointments: 4, status: "Active" },
  { id: "chloe", firstName: "Chloe", lastName: "Davis", email: "chloe.davis@example.com", phone: "(212) 555-0114", totalAppointments: 9, status: "Active" },
  { id: "james", firstName: "James", lastName: "Wilson", email: "james.wilson@example.com", phone: "(347) 555-0173", totalAppointments: 1, status: "New" },
  { id: "grace", firstName: "Grace", lastName: "Kim", email: "grace.kim@example.com", phone: "(917) 555-0108", totalAppointments: 1, status: "New" },
  { id: "noah", firstName: "Noah", lastName: "Patel", email: "noah.patel@example.com", phone: "(646) 555-0186", totalAppointments: 5, status: "Active" },
  { id: "isla", firstName: "Isla", lastName: "Bennett", email: "isla.bennett@example.com", phone: "(718) 555-0135", totalAppointments: 1, status: "New" },
  { id: "elena", firstName: "Elena", lastName: "Vasquez", email: "elena.vasquez@example.com", phone: "(212) 555-0194", totalAppointments: 7, status: "Active" },
  { id: "leo", firstName: "Leo", lastName: "Martin", email: "leo.martin@example.com", phone: "(917) 555-0127", totalAppointments: 1, status: "New" },
  { id: "hannah", firstName: "Hannah", lastName: "Brooks", email: "hannah.brooks@example.com", phone: "(646) 555-0151", totalAppointments: 4, status: "Active" },
  { id: "camille", firstName: "Camille", lastName: "Dubois", email: "camille.dubois@example.com", phone: "(212) 555-0180", totalAppointments: 8, status: "Active" },
  { id: "ethan", firstName: "Ethan", lastName: "Clarke", email: "ethan.clarke@example.com", phone: "(347) 555-0166", totalAppointments: 2, status: "Active" },
  { id: "priya", firstName: "Priya", lastName: "Shah", email: "priya.shah@example.com", phone: "(917) 555-0139", totalAppointments: 1, status: "New" },
  { id: "adele", firstName: "Adele", lastName: "Fischer", email: "adele.fischer@example.com", phone: "(212) 555-0102", totalAppointments: 6, status: "Active" },
  { id: "marcus", firstName: "Marcus", lastName: "Hale", email: "marcus.hale@example.com", phone: "(646) 555-0178", totalAppointments: 3, status: "Active" },
  { id: "maya", firstName: "Maya", lastName: "Alvarez", email: "maya.alvarez@example.com", phone: "(718) 555-0144", totalAppointments: 1, status: "New" },
  { id: "owen", firstName: "Owen", lastName: "Harris", email: "owen.harris@example.com", phone: "(212) 555-0199", totalAppointments: 5, status: "Active" },
  { id: "clara", firstName: "Clara", lastName: "Singh", email: "clara.singh@example.com", phone: "(917) 555-0116", totalAppointments: 4, status: "Active" },
  { id: "hugo", firstName: "Hugo", lastName: "Berg", email: "hugo.berg@example.com", phone: "(347) 555-0182", totalAppointments: 1, status: "New" },
  { id: "benjamin", firstName: "Benjamin", lastName: "Cole", email: "benjamin.cole@example.com", phone: "(646) 555-0120", totalAppointments: 6, status: "Active" },
  { id: "sophie", firstName: "Sophie", lastName: "Nguyen", email: "sophie.nguyen@example.com", phone: "(212) 555-0157", totalAppointments: 1, status: "New" },
  { id: "nora", firstName: "Nora", lastName: "Blake", email: "nora.blake@example.com", phone: "(917) 555-0193", totalAppointments: 3, status: "Active" },
  { id: "eva", firstName: "Eva", lastName: "Rossi", email: "eva.rossi@example.com", phone: "(646) 555-0106", totalAppointments: 1, status: "New" },
  { id: "lila", firstName: "Lila", lastName: "Park", email: "lila.park@example.com", phone: "(718) 555-0171", totalAppointments: 2, status: "Active" },
  { id: "iris", firstName: "Iris", lastName: "Cho", email: "iris.cho@example.com", phone: "(212) 555-0141", totalAppointments: 1, status: "New" },
  { id: "felix", firstName: "Felix", lastName: "Navarro", email: "felix.navarro@example.com", phone: "(917) 555-0188", totalAppointments: 4, status: "Active" },
  { id: "theo", firstName: "Theo", lastName: "Marchand", email: "theo.marchand@example.com", phone: "(347) 555-0124", totalAppointments: 2, status: "Active" },
  { id: "jules", firstName: "Jules", lastName: "Moretti", email: "jules.moretti@example.com", phone: "(646) 555-0160", totalAppointments: 5, status: "Active" },
  { id: "celeste", firstName: "Celeste", lastName: "Ward", email: "celeste.ward@example.com", phone: "(212) 555-0133", totalAppointments: 1, status: "New" },
  { id: "helena", firstName: "Helena", lastName: "Ortiz", email: "helena.ortiz@example.com", phone: "(917) 555-0175", totalAppointments: 1, status: "New" },
  { id: "simon", firstName: "Simon", lastName: "Adler", email: "simon.adler@example.com", phone: "(646) 555-0196", totalAppointments: 2, status: "Active" },
  { id: "anna", firstName: "Anna", lastName: "Petrov", email: "anna.petrov@example.com", phone: "(212) 555-0109", totalAppointments: 7, status: "Active" },
  { id: "paul", firstName: "Paul", lastName: "Berger", email: "paul.berger@example.com", phone: "(718) 555-0154", totalAppointments: 3, status: "Active" },
  { id: "claire", firstName: "Claire", lastName: "Dumont", email: "claire.dumont@example.com", phone: "(212) 555-0128", totalAppointments: 4, status: "Inactive", lastVisit: "2026-06-12" },
  { id: "victor", firstName: "Victor", lastName: "Lang", email: "victor.lang@example.com", phone: "(917) 555-0169", totalAppointments: 2, status: "Inactive", lastVisit: "2026-04-03" },
];

const monday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "coupe", professionalId: "emma", customerId: "sarah", status: "confirmed" },
  { time: "10:30", serviceId: "balayage", professionalId: "sofia", customerId: "olivia", status: "confirmed" },
  { time: "11:00", serviceId: "consult", professionalId: "mia", customerId: "amelie", status: "confirmed" },
  { time: "13:00", serviceId: "blowout", professionalId: "mia", customerId: "chloe", status: "confirmed" },
  { time: "14:30", serviceId: "color", professionalId: "emma", customerId: "james", status: "pending" },
  { time: "15:00", serviceId: "color", professionalId: "sofia", customerId: "grace", status: "confirmed" },
  { time: "15:30", serviceId: "coupe", professionalId: "mia", customerId: "isla", status: "pending" },
  { time: "16:30", serviceId: "blowout", professionalId: "emma", customerId: "noah", status: "confirmed" },
];

const tuesday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "blowout", professionalId: "emma", customerId: "elena", status: "confirmed" },
  { time: "09:00", serviceId: "color", professionalId: "sofia", customerId: "leo", status: "confirmed" },
  { time: "10:30", serviceId: "blowout", professionalId: "mia", customerId: "hannah", status: "confirmed" },
  { time: "13:00", serviceId: "blowout", professionalId: "emma", customerId: "camille", status: "confirmed" },
  { time: "14:00", serviceId: "coupe", professionalId: "mia", customerId: "ethan", status: "confirmed" },
  { time: "15:00", serviceId: "color", professionalId: "sofia", customerId: "priya", status: "confirmed" },
];

const wednesday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "consult", professionalId: "mia", customerId: "adele", status: "confirmed" },
  { time: "09:30", serviceId: "blowout", professionalId: "emma", customerId: "marcus", status: "confirmed" },
  { time: "10:00", serviceId: "color", professionalId: "sofia", customerId: "maya", status: "confirmed" },
  { time: "13:00", serviceId: "blowout", professionalId: "emma", customerId: "owen", status: "confirmed" },
  { time: "14:00", serviceId: "coupe", professionalId: "mia", customerId: "clara", status: "confirmed" },
  { time: "15:30", serviceId: "consult", professionalId: "sofia", customerId: "hugo", status: "pending" },
];

const thursday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "coupe", professionalId: "emma", customerId: "benjamin", status: "confirmed" },
  { time: "09:30", serviceId: "balayage", professionalId: "sofia", customerId: "sophie", status: "confirmed" },
  { time: "11:00", serviceId: "blowout", professionalId: "mia", customerId: "nora", status: "confirmed" },
  { time: "14:00", serviceId: "color", professionalId: "emma", customerId: "eva", status: "pending" },
  { time: "15:00", serviceId: "coupe", professionalId: "mia", customerId: "lila", status: "confirmed" },
];

const friday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "color", professionalId: "sofia", customerId: "iris", status: "confirmed" },
  { time: "09:30", serviceId: "coupe", professionalId: "emma", customerId: "felix", status: "confirmed" },
  { time: "11:30", serviceId: "blowout", professionalId: "mia", customerId: "theo", status: "confirmed" },
  { time: "13:30", serviceId: "blowout", professionalId: "emma", customerId: "jules", status: "confirmed" },
  { time: "14:00", serviceId: "color", professionalId: "sofia", customerId: "celeste", status: "confirmed" },
];

const saturday: AppointmentSeed[] = [
  { time: "09:00", serviceId: "coupe", professionalId: "emma", customerId: "helena", status: "confirmed" },
  { time: "10:00", serviceId: "blowout", professionalId: "mia", customerId: "simon", status: "confirmed" },
  { time: "11:00", serviceId: "color", professionalId: "sofia", customerId: "anna", status: "confirmed" },
  { time: "14:00", serviceId: "blowout", professionalId: "emma", customerId: "paul", status: "confirmed" },
];

const dayTemplates: AppointmentSeed[][] = [monday, tuesday, wednesday, thursday, friday, saturday];

export function serviceById(id: string | null | undefined, catalog: Service[] = services) {
  return catalog.find((service) => service.id === id) ?? null;
}

export function professionalById(id: string | null | undefined) {
  return professionals.find((person) => person.id === id) ?? null;
}

export function customerById(id: string) {
  return customers.find((customer) => customer.id === id) ?? null;
}

export function buildAppointments(now = new Date()): Appointment[] {
  const mondayDate = startOfWeek(now);
  const todayIndex = (now.getDay() + 6) % 7;
  const todayIso = toISODate(now);
  const rotatedDays = Array.from({ length: 7 }, (_, index) => (todayIndex + index) % 7);
  const appointments: Appointment[] = [];

  dayTemplates.forEach((template, templateIndex) => {
    const weekIndex = rotatedDays[templateIndex];
    if (weekIndex === undefined) return;
    const date = toISODate(addDays(mondayDate, weekIndex));
    template.forEach((seed, index) => {
      const service = serviceById(seed.serviceId);
      if (!service) return;
      appointments.push({
        id: `${date}-${seed.time}-${seed.professionalId}-${index}`,
        date,
        time: seed.time,
        duration: service.duration,
        serviceId: seed.serviceId,
        professionalId: seed.professionalId,
        customerId: seed.customerId,
        status: date < todayIso ? "completed" : seed.status,
      });
    });
  });

  return appointments.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export function weekRevenue(list: Appointment[], catalog: Service[] = services) {
  return list.reduce((sum, appointment) => sum + (serviceById(appointment.serviceId, catalog)?.price ?? 0), 0);
}
