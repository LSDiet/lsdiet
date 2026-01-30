import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import { Send, Mail } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // Since there's no backend, we show a success message and direct to email
    const mailtoLink = `mailto:info@whataboutweight.com?subject=Question from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\nMessage:\n${data.message}`)}`;
    
    window.open(mailtoLink, "_blank");
    
    toast.success("Opening your email client!", {
      description: "Your message details have been pre-filled. Just hit send!",
    });
    
    form.reset();
  };

  return (
    <section id="contact" className="py-5 bg-background">
      <div className="container">
        {/* The Insight - moved from MissingPieceSection */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-card/50 backdrop-blur rounded-2xl p-5 md:p-6 border border-border/50 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Weight loss is not just about{" "}
              <span className="relative inline-block">
                <span className="text-muted-foreground/70">eating less</span>
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 30" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 10 8 Q 50 15, 90 22 M 90 8 Q 50 15, 10 22" 
                    stroke="hsl(0, 65%, 50%)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    fill="none" 
                    opacity="0.6"
                    style={{ filter: "url(#crayon)" }}
                  />
                  <defs>
                    <filter id="crayon">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                </svg>
              </span>{" "}
              and{" "}
              <span className="relative inline-block">
                <span className="text-muted-foreground/70">exercising more</span>
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 30" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M 10 8 Q 50 15, 90 22 M 90 8 Q 50 15, 10 22" 
                    stroke="hsl(0, 65%, 50%)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    fill="none" 
                    opacity="0.6"
                    style={{ filter: "url(#crayon2)" }}
                  />
                  <defs>
                    <filter id="crayon2">
                      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                </svg>
              </span>
              , but about{" "}
              <span className="font-semibold text-primary">
                eating and moving in ways that make sense for your goals, context, and access.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent/15 border border-accent/25 mb-6">
              <span className="text-sm font-medium text-accent">Have a Question?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 text-primary">
              We'd Love to Hear From You
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can we help you?"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Email Alternative */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              Or email us directly at
            </p>
            <a
              href="mailto:info@whataboutweight.com"
              className="inline-flex items-center gap-2 mt-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@whataboutweight.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
