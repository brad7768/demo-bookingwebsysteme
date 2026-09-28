"use client";

import { useMemo, useState } from "react";
import {
  buildAppointments,
  customerById,
  customers as seedCustomers,
  professionalById,
  serviceById,
} from "./data";
import type { Customer, EnrichedAppointment, GuestBooking, Service } from "./types";
import { useGuestBookings, useServiceCatalog } from "./stored";
import { customerName, startOfDay, startOfWeek, toISODate } from "./utils";

function enrichStudio(now: Date, catalog: Service[]): EnrichedAppointment[] {
  return buildAppointments(now).map((appointment) => {
    const service = serviceById(appointment.serviceId, catalog);
    const professional = professionalById(appointment.professionalId);
    const customer = customerById(appointment.customerId);
    return {
      ...appointment,
      serviceName: service?.name ?? "Service",
      price: service?.price ?? 0,
      professionalName: professional?.name ?? "Stylist",
      customerName: customer ? customerName(customer.firstName, customer.lastName) : "Guest",
      customerEmail: customer?.email ?? "",
      source: "studio",
    };
  });
}

function enrichGuest(booking: GuestBooking): EnrichedAppointment {
  return {
    id: booking.id,
    date: booking.date,
    time: booking.time,
    duration: booking.duration,
    serviceId: booking.serviceId,
    professionalId: booking.professionalId,
    customerId: `guest-${booking.id}`,
    status: "confirmed",
    serviceName: booking.serviceName,
    price: booking.price,
    professionalName: booking.professionalName,
    customerName: customerName(booking.firstName, booking.lastName),
    customerEmail: booking.email,
    source: "demo",
  };
}

export function useStudio() {
  const [now] = useState(() => new Date());
  const catalog = useServiceCatalog();
  const guest = useGuestBookings();

  return useMemo(() => {
    const studioAppointments = enrichStudio(now, catalog);
    const guestAppointments = guest.map(enrichGuest);
    const appointments = [...studioAppointments, ...guestAppointments].sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time),
    );
    const today = toISODate(startOfDay(now));
    const weekStart = startOfWeek(now);
    const weekEnd = toISODate(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
    const todayAppointments = appointments.filter((appointment) => appointment.date === today);
    const weekAppointments = appointments.filter((appointment) => appointment.date >= toISODate(weekStart) && appointment.date < weekEnd);

    const seenGuestEmails = new Set<string>();
    const guestCustomers: Customer[] = guest.flatMap((booking) => {
      const email = booking.email.toLowerCase();
      if (seedCustomers.some((customer) => customer.email.toLowerCase() === email) || seenGuestEmails.has(email)) return [];
      seenGuestEmails.add(email);
      const visits = guest.filter((item) => item.email.toLowerCase() === email);
      return [{
        id: `guest-${booking.id}`,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        totalAppointments: visits.length,
        status: "New" as const,
        lastVisit: visits.map((item) => item.date).sort().at(-1),
      }];
    });

    const customers = [...seedCustomers, ...guestCustomers].map((customer) => {
      const visits = appointments
        .filter((appointment) => {
          if (appointment.customerId === customer.id) return true;
          return appointment.customerEmail.toLowerCase() === customer.email.toLowerCase();
        })
        .map((appointment) => appointment.date)
        .sort();
      const extra = guest.filter((booking) => booking.email.toLowerCase() === customer.email.toLowerCase()).length;
      const lastFromBook = visits.at(-1);
      return {
        ...customer,
        totalAppointments: customer.totalAppointments + (customer.id.startsWith("guest-") ? 0 : extra),
        lastVisit: lastFromBook && (!customer.lastVisit || lastFromBook > customer.lastVisit) ? lastFromBook : customer.lastVisit,
      };
    });

    return {
      now,
      catalog,
      appointments,
      todayAppointments,
      weekAppointments,
      customers,
      stats: {
        today: todayAppointments.length,
        week: weekAppointments.length,
        newCustomers: customers.filter((customer) => customer.status === "New").length,
        revenue: weekAppointments.reduce((sum, appointment) => sum + appointment.price, 0),
      },
    };
  }, [catalog, guest, now]);
}
