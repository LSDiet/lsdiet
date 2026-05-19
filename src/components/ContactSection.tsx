import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import { Send, Mail } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000),
});
type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    const mailtoLink = `mailto:info@LSDiet.com?subject=Question from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\nMessage:\n${data.message}`)}`;
    window.open(mailtoLink, "_blank");
    toast.success("Opening your email client!", {
      description: "Your message details have been pre-filled. Just hit send!",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="container">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Have a Question?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-4">
              We'd Love to <span className="text-accent">Hear</span> From You
            </h2>
            <p className="text-[hsl(0_0%_22%)] text-sm">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Name *</FormLabel>
                    <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Email *</FormLabel>
                    <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Phone (optional)</FormLabel>
                    <FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider">Message *</FormLabel>
                    <FormControl><Textarea placeholder="How can we help you?" className="min-h-[120px] resize-none" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button variant="accent" type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Form>
          </div>

          <div className="text-center mt-8">
            <p className="text-[hsl(0_0%_22%)] text-xs">Or email us directly at</p>
            <a
              href="mailto:info@LSDiet.com"
              className="inline-flex items-center gap-2 mt-2 text-accent hover:underline font-medium text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@LSDiet.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
