export type AppointmentStatus = "confirmed" | "pending" | "completed";

export type CustomerStatus = "Active" | "New" | "Inactive";

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  active: boolean;
};

export type Professional = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string;
  initials: string;
  yearsExperience?: number;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalAppointments: number;
  status: CustomerStatus;
  lastVisit?: string;
};

export type AppointmentSeed = {
  time: string;
  serviceId: string;
  professionalId: string;
  customerId: string;
  status: Exclude<AppointmentStatus, "completed">;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  duration: number;
  serviceId: string;
  professionalId: string;
  customerId: string;
  status: AppointmentStatus;
};

export type GuestBooking = {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  duration: number;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  createdAt: string;
};

export type EnrichedAppointment = Appointment & {
  serviceName: string;
  price: number;
  professionalName: string;
  customerName: string;
  customerEmail: string;
  source: "studio" | "demo";
};

export type BookingDraft = {
  serviceId: string | null;
  professionalId: string | null;
  date: string | null;
  time: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
};
