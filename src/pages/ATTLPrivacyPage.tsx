import { Helmet } from "react-helmet-async";

const ATTLPrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | Anti-Time Theft Logger</title>
        <meta
          name="description"
          content="How Anti-Time Theft Logger collects, uses, and protects your personal information under Canadian PIPEDA and BC PIPA law."
        />
        <link rel="canonical" href="https://lsdiet.com/ATTL_Privacy" />
      </Helmet>
      <main className="container max-w-2xl py-16 px-4">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-2">
          Anti-Time Theft Logger Privacy &amp; Data Protection Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">Effective date: July 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p>
            Anti-Time Theft Logger is committed to protecting user privacy in compliance with the
            Personal Information Protection and Electronic Documents Act (PIPEDA) and British
            Columbia's Personal Information Protection Act (PIPA).
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 border-b pb-2">
            1. Designated Privacy Officer
          </h2>
          <p>
            Accountability for our platform's data compliance is managed directly by our appointed
            Privacy Officer. For any data access requests, compliance audits, or privacy inquiries,
            please contact:
          </p>
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="m-0">
              <strong>Privacy Officer:</strong> Oscar
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:support@lsdiet.com">support@lsdiet.com</a>
            </p>
          </div>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 border-b pb-2">
            2. Data Minimization &amp; Collection Limits
          </h2>
          <p>We strictly limit what we collect. Anti-Time Theft Logger collects:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Timestamps:</strong> exact start and end times of
              user-initiated break sessions.
            </li>
            <li>
              <strong className="text-foreground">Network fingerprint:</strong> your public IP
              address, used to verify isolation from a corporate network.
            </li>
            <li>
              <strong className="text-foreground">ISP / network provider name:</strong> we look up
              the internet service provider or network organization name associated with your public
              IP address, via the third party lookup service{" "}
              <a href="https://ipwho.is" target="_blank" rel="noreferrer">
                ipwho.is
              </a>
              . This is shown alongside, never in place of, your raw IP address, for readability. Your
              IP address is sent to ipwho.is to perform this lookup.
            </li>
            <li>
              <strong className="text-foreground">Minimized domain contexts:</strong> we extract and
              log only top level domain names (e.g. <code>github.com</code>). We explicitly strip and
              do not collect full URLs, private sub paths, or query strings, to prevent session token
              leakage.
            </li>
            <li>
              <strong className="text-foreground">Contemporaneous note:</strong> an optional,
              user-authored, free text description of the session's activity, entered voluntarily
              before ending a session.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 border-b pb-2">
            3. Data Subject Rights (Right to Deletion)
          </h2>
          <p>
            Under Canadian law, you retain full ownership of your data. You may invoke your right to
            deletion at any time: "Clear Local History" in the extension's ledger wipes your device
            instantly, and emailing our Privacy Officer above will delete any backup copy on file with
            us, confirmed once it's done.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ATTLPrivacyPage;
