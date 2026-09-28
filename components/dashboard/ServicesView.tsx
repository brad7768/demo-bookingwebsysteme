"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextArea } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { saveServices } from "@/lib/catalog";
import { useServiceCatalog } from "@/lib/stored";
import type { Service } from "@/lib/types";
import { cn, formatDuration, formatPrice } from "@/lib/utils";

const blank = (): Service => ({
  id: `service-${Date.now()}`,
  name: "",
  price: 80,
  duration: 60,
  description: "",
  active: true,
});

export function ServicesView() {
  const services = useServiceCatalog();
  const [editing, setEditing] = useState<Service | null>(null);

  function update(next: Service) {
    const exists = services.some((service) => service.id === next.id);
    saveServices(exists ? services.map((service) => (service.id === next.id ? next : service)) : [next, ...services]);
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Services"
        title="What you offer"
        description="Prices and timing shown on the booking page. Inactive services stay off the public list."
        action={<Button onClick={() => setEditing(blank())}>Add service</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="rounded-3xl border border-line bg-paper p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl">{service.name}</h2>
                <p className="mt-2 text-sm text-ink-soft">{service.description}</p>
              </div>
              <p className="text-sm">{formatPrice(service.price)}</p>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">{formatDuration(service.duration)}</p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={service.active}
                onClick={() => saveServices(services.map((item) => (item.id === service.id ? { ...item, active: !item.active } : item)))}
                className="inline-flex items-center gap-3 text-sm"
              >
                <span className={cn("relative h-6 w-11 rounded-full transition", service.active ? "bg-ink" : "bg-sand-deep")}>
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-paper transition", service.active ? "left-5" : "left-0.5")} />
                </span>
                {service.active ? "Active" : "Inactive"}
              </button>
              <Button size="sm" variant="secondary" onClick={() => setEditing(service)}>
                Edit
              </Button>
            </div>
          </article>
        ))}
      </div>
      {editing ? <ServiceDialog service={editing} onClose={() => setEditing(null)} onSave={update} /> : null}
    </div>
  );
}

function ServiceDialog({
  service,
  onClose,
  onSave,
}: {
  service: Service;
  onClose: () => void;
  onSave: (service: Service) => void;
}) {
  const [draft, setDraft] = useState(service);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close dialog" onClick={onClose} />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        className="relative w-full max-w-lg animate-rise rounded-3xl bg-paper p-6 shadow-soft"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.name.trim()) {
            setError("Enter a service name.");
            return;
          }
          if (draft.duration < 15) {
            setError("Duration should be at least 15 minutes.");
            return;
          }
          onSave({ ...draft, name: draft.name.trim(), description: draft.description.trim(), price: Math.max(0, draft.price) });
        }}
      >
        <h2 id="service-dialog-title" className="font-serif text-3xl">
          {service.name ? "Edit service" : "Add service"}
        </h2>
        <div className="mt-5 space-y-4">
          <Field label="Name" name="service-name" value={draft.name} error={error && !draft.name.trim() ? error : undefined} onChange={(event) => setDraft((value) => ({ ...value, name: event.target.value }))} />
          <TextArea label="Description" name="service-description" value={draft.description} onChange={(event) => setDraft((value) => ({ ...value, description: event.target.value }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price" name="service-price" type="number" min={0} value={draft.price} onChange={(event) => setDraft((value) => ({ ...value, price: Number(event.target.value) }))} />
            <Field label="Duration (min)" name="service-duration" type="number" min={15} step={15} value={draft.duration} onChange={(event) => setDraft((value) => ({ ...value, duration: Number(event.target.value) }))} />
          </div>
          {error && draft.name.trim() ? <p className="text-xs text-ink">{error}</p> : null}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save service</Button>
        </div>
      </form>
    </div>
  );
}
