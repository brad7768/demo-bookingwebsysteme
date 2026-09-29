"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { studio } from "@/lib/data";
import { saveStudioSettings, useStudioSettings, type StudioSettings } from "@/lib/stored";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const stored = useStudioSettings();
  const [draft, setDraft] = useState<StudioSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const settings = draft ?? stored;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Studio details"
        description="These preferences stay in this browser. Nothing here is sent to a server."
      />
      <form
        className="max-w-2xl space-y-4 rounded-3xl border border-line bg-paper p-6 shadow-soft"
        onSubmit={(event) => {
          event.preventDefault();
          saveStudioSettings(settings);
          setDraft(null);
          setSaved(true);
          window.setTimeout(() => setSaved(false), 1800);
        }}
      >
        <Field label="Studio name" name="studio-name" value={settings.name} onChange={(event) => setDraft({ ...settings, name: event.target.value })} />
        <Field label="Public email" name="studio-email" type="email" value={settings.email} onChange={(event) => setDraft({ ...settings, email: event.target.value })} />
        <Field label="Phone" name="studio-phone" value={settings.phone} onChange={(event) => setDraft({ ...settings, phone: event.target.value })} />
        <Field label="Address" name="studio-address" value={settings.address} onChange={(event) => setDraft({ ...settings, address: event.target.value })} />
        <div className="space-y-3 pt-2">
          <Toggle
            label="Email confirmations"
            checked={settings.confirmations}
            onChange={(confirmations) => setDraft({ ...settings, confirmations })}
          />
          <Toggle
            label="SMS reminders"
            checked={settings.reminders}
            onChange={(reminders) => setDraft({ ...settings, reminders })}
          />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">Save settings</Button>
          {saved ? <p className="text-sm text-ink-soft">Saved in this browser.</p> : null}
        </div>
      </form>
      <div className="max-w-2xl rounded-3xl border border-line bg-paper/70 p-6">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Hours on the booking page</p>
        <dl className="mt-3 space-y-2 text-sm">
          {studio.hours.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-ink-soft">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-4 rounded-2xl border border-line px-4 py-3 text-left text-sm">
      {label}
      <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition", checked ? "bg-ink" : "bg-sand-deep")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-paper transition", checked ? "left-5" : "left-0.5")} />
      </span>
    </button>
  );
}
