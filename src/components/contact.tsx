"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Section, SectionLabel, SectionPixelTitle } from "./section";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  NAME,
  PHONE,
} from "@/lib/data";
import { Button } from "./button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message should be at least 10 characters."),
  // Honeypot — bots fill this; humans don't see it.
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const sendViaWeb3Forms = async (values: FormValues) => {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Portfolio inquiry from ${values.name}`,
        from_name: values.name,
        replyto: values.email,
        email: values.email,
        message: values.message,
        botcheck: values.botcheck ?? "",
      }),
    });
    const data = (await res.json()) as { success: boolean; message?: string };
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Submission failed");
    }
  };

  const sendViaMailto = (values: FormValues) => {
    const body = `Hi ${NAME.split(" ")[0]},%0D%0A%0D%0A${encodeURIComponent(
      values.message
    )}%0D%0A%0D%0A— ${encodeURIComponent(values.name)} (${encodeURIComponent(
      values.email
    )})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Hello from your portfolio"
    )}&body=${body}`;
  };

  const onSubmit = async (values: FormValues) => {
    if (values.botcheck) return; // honeypot tripped
    setSubmitting(true);
    try {
      if (WEB3FORMS_KEY) {
        await sendViaWeb3Forms(values);
        toast.success("Message sent — I’ll reply soon.");
      } else {
        sendViaMailto(values);
        toast.success("Opening your mail client…");
      }
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="space-y-10">
      <SectionPixelTitle text="CONTACT" palette="warm" />
      <div className="space-y-3">
        <SectionLabel>Contact</SectionLabel>
        <h2>Let’s build something</h2>
        <p className="max-w-3xl text-text-secondary">
          Reach out about full-time roles starting Feb 2026, freelance AI/DevOps
          work, or open-source collaboration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-panel space-y-4 p-6"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              Name
            </label>
            <input
              {...register("name")}
              className="mt-1 w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-cyan"
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-cyan"
              placeholder="you@company.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-text-secondary">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              className="mt-1 w-full resize-none rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-cyan"
              placeholder="Tell me about the role or project…"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>
          {/* honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("botcheck")}
            className="hidden"
            aria-hidden
          />
          <Button type="submit" disabled={submitting} className="w-full gap-2">
            {submitting ? (
              "Sending…"
            ) : (
              <>
                <Send className="h-4 w-4" /> Send Message
              </>
            )}
          </Button>
          {!WEB3FORMS_KEY && (
            <p className="text-[10px] text-text-secondary">
              Email API key not set — falling back to your mail client.
            </p>
          )}
        </form>

        <div className="space-y-4">
          <div className="glass-panel space-y-4 p-6">
            <h3 className="text-lg font-semibold text-text-primary">Direct</h3>
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <ContactRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={PHONE}
              href={`tel:${PHONE.replace(/\s/g, "")}`}
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value={LOCATION}
            />
          </div>
          <div className="glass-panel space-y-3 p-6">
            <h3 className="text-lg font-semibold text-text-primary">Social</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary hover:border-accent-cyan hover:text-accent-cyan"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary hover:border-accent-cyan hover:text-accent-cyan"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary hover:border-accent-cyan hover:text-accent-cyan"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-8 w-8 place-items-center rounded-md bg-bg-elevated text-text-secondary">
        {icon}
      </span>
      <span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-text-secondary">
          {label}
        </span>
        <span className="block text-sm text-text-primary">{value}</span>
      </span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:text-accent-cyan"
      >
        {inner}
      </a>
    );
  }
  return <div className="flex items-center gap-3 p-1">{inner}</div>;
}
