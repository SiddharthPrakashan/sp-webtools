import { siteConfig } from "@config/site";
import { LegalContact, LegalPage } from "@site/components/LegalPage";

function ExternalLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  );
}

// Source: docs/privacy-policy.md. Keep both in sync.
export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="November 2, 2026">
      <p>
        Welcome to <strong>{siteConfig.name}</strong> (
        <code>{siteConfig.url}</code>). Your privacy is important to us. This
        Privacy Policy explains how our website handles information, how browser
        storage works, and how third-party services may collect information when
        you use our website.
      </p>
      <p>
        By accessing or using this website, you acknowledge that you have read
        this Privacy Policy.
      </p>

      <section aria-labelledby="information-we-collect">
        <h2 id="information-we-collect">1. Information We Collect</h2>
        <p>We aim to collect as little personal information as possible.</p>

        <h3>Information You Provide</h3>
        <p>
          Our website does not have a contact form or user registration system.
        </p>
        <p>
          If you voluntarily contact us through the email address or social
          media links provided on our website, we may receive personal
          information such as your name, email address, social media profile
          information, and the contents of your message.
        </p>
        <p>
          We use this information only to respond to your enquiries and
          communications.
        </p>

        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website, our hosting provider and third-party
          services may process certain technical information, including:
        </p>
        <ul>
          <li>IP address.</li>
          <li>Browser type and version.</li>
          <li>Device and operating system information.</li>
          <li>Pages visited and approximate time spent on the website.</li>
          <li>Referring website or source.</li>
          <li>Approximate geographic location derived from your IP address.</li>
          <li>Technical and performance information.</li>
        </ul>
        <p>
          This information may be used for website security, analytics,
          troubleshooting, and performance monitoring.
        </p>
      </section>

      <section aria-labelledby="file-processing">
        <h2 id="file-processing">2. File Processing and User Data</h2>
        <p>
          Our utility tools are designed to process files and user inputs
          directly within your browser.
        </p>
        <p>Examples include:</p>
        <ul>
          <li>
            Instagram followers export analyzer (
            <a href="/ig-followers-check/">ig-followers-check</a>).
          </li>
          <li>
            Other browser-based utilities that may be introduced in the future.
          </li>
        </ul>
        <p>
          <strong>
            We do not upload your selected files or tool inputs to our servers.
          </strong>
        </p>
        <p>
          Files and user-provided inputs are processed locally in your browser.
          Where an application saves information for convenience or to preserve
          your progress, that information may be stored in your browser&apos;s
          local storage (<code>localStorage</code>).
        </p>
        <p>This means:</p>
        <ul>
          <li>Your selected files and inputs remain on your device.</li>
          <li>
            We do not receive or store the contents of these files on our
            servers.
          </li>
          <li>
            Your locally stored information is generally accessible only through
            the same website origin and browser profile.
          </li>
          <li>
            Clearing your browser&apos;s site data or local storage may
            permanently remove saved information.
          </li>
          <li>
            Locally stored information may not be available on another device or
            browser.
          </li>
        </ul>
        <p>
          We recommend avoiding the use of our tools with highly sensitive or
          confidential information.
        </p>
      </section>

      <section aria-labelledby="local-storage">
        <h2 id="local-storage">3. Local Storage and Browser Technologies</h2>
        <p>
          Our website uses browser storage technologies, including{" "}
          <code>localStorage</code>, to store certain user inputs, preferences,
          or application data.
        </p>
        <p>
          Unlike cookies, local storage does not automatically send stored
          values to our servers with every HTTP request.
        </p>
        <p>
          You can remove locally stored information by clearing the
          website&apos;s data through your browser settings.
        </p>
        <p>
          Please note that clearing local storage may cause saved preferences or
          previously entered information to be lost.
        </p>
      </section>

      <section aria-labelledby="cookies">
        <h2 id="cookies">4. Cookies and Similar Technologies</h2>
        <p>
          Our website does not intentionally set first-party cookies for its own
          utility functionality.
        </p>
        <p>
          However, third-party services integrated into or used by our website
          may use cookies, local storage, or other similar technologies.
        </p>
        <p>These services may use such technologies for:</p>
        <ul>
          <li>Website analytics and performance measurement.</li>
          <li>Advertising delivery and measurement.</li>
          <li>Fraud prevention and security.</li>
          <li>Understanding visitor interactions.</li>
          <li>Advertising personalization, where enabled and permitted.</li>
        </ul>
        <p>
          Cookie usage depends on the third-party services enabled and their
          respective configurations.
        </p>
        <p>
          You can manage or disable cookies through your browser settings.
          Blocking certain cookies may affect third-party services or
          advertising functionality.
        </p>
      </section>

      <section aria-labelledby="google-adsense">
        <h2 id="google-adsense">5. Google AdSense and Advertising</h2>
        <p>
          We may use Google AdSense to display advertisements on our website.
        </p>
        <p>
          Google and its advertising partners may use cookies or similar
          technologies to:
        </p>
        <ul>
          <li>Display advertisements.</li>
          <li>Measure advertising performance.</li>
          <li>Prevent fraudulent advertising activity.</li>
          <li>Limit repeated advertisements.</li>
          <li>
            Provide personalized or non-personalized advertisements, depending
            on your settings and applicable consent requirements.
          </li>
        </ul>
        <p>
          Google&apos;s advertising technologies may collect information about
          your visits to this website and other websites to provide relevant
          advertisements.
        </p>
        <p>
          You can learn more about Google&apos;s advertising technologies here:
        </p>
        <p>
          <ExternalLink href="https://policies.google.com/technologies/partner-sites" />
        </p>
        <p>You can manage your advertising personalization settings here:</p>
        <p>
          <ExternalLink href="https://adssettings.google.com/" />
        </p>
        <p>For more information about Google&apos;s privacy practices:</p>
        <p>
          <ExternalLink href="https://policies.google.com/privacy" />
        </p>
      </section>

      <section aria-labelledby="hosting-security">
        <h2 id="hosting-security">
          6. Analytics, Hosting and Security Services
        </h2>
        <p>
          We use Cloudflare services for website hosting, delivery, performance,
          and security.
        </p>
        <p>
          Cloudflare and other services we may use can process technical
          information such as IP addresses, browser details, request
          information, and website usage data to provide their services.
        </p>
        <p>
          Depending on the specific Cloudflare products and configurations
          enabled, certain services may use cookies or similar technologies.
        </p>
        <p>For more information about Cloudflare&apos;s privacy practices:</p>
        <p>
          <ExternalLink href="https://www.cloudflare.com/privacypolicy/" />
        </p>
        <p>
          If additional analytics services are introduced, their data collection
          and processing practices will be covered by their respective privacy
          policies.
        </p>
      </section>

      <section aria-labelledby="third-party-websites">
        <h2 id="third-party-websites">
          7. Third-Party Websites and Social Media
        </h2>
        <p>
          Our website may contain links to external websites, social media
          platforms, documentation, and other third-party resources.
        </p>
        <p>
          When you visit these external websites, their own privacy policies and
          terms apply.
        </p>
        <p>
          We do not control how third-party websites collect, use, or process
          your information. We encourage you to review their privacy policies
          before interacting with them.
        </p>
      </section>

      <section aria-labelledby="data-sharing">
        <h2 id="data-sharing">8. Data Sharing and Disclosure</h2>
        <p>We do not sell, rent, or trade your personal information.</p>
        <p>
          Since our utility tools process files and inputs locally in your
          browser, we do not receive those file contents through the normal
          operation of these tools.
        </p>
        <p>
          Limited technical information may be processed by hosting, security,
          analytics, and advertising providers to deliver their services.
        </p>
        <p>
          We may also disclose information when required by applicable laws,
          regulations, or valid legal requests.
        </p>
      </section>

      <section aria-labelledby="security-retention">
        <h2 id="security-retention">9. Data Security and Retention</h2>
        <p>
          We take reasonable measures to maintain the security and reliability
          of our website.
        </p>
        <p>
          Information stored through <code>localStorage</code> remains on your
          device and is subject to the security of your browser and device.
        </p>
        <p>
          We do not maintain server-side copies of files or tool inputs
          processed locally by our applications.
        </p>
        <p>
          Information received through voluntary email or social media
          communications may be retained for as long as reasonably necessary to
          respond to enquiries, maintain communication records, or comply with
          legal obligations.
        </p>
        <p>
          No method of electronic storage or transmission is completely secure,
          and we cannot guarantee absolute security.
        </p>
      </section>

      <section aria-labelledby="childrens-privacy">
        <h2 id="childrens-privacy">10. Children&apos;s Privacy</h2>
        <p>
          Our website and tools are not specifically directed at children under
          the age of 13.
        </p>
        <p>
          We do not knowingly collect personal information from children under
          13. If you believe a child has provided personal information to us,
          please contact us so that we can take appropriate action.
        </p>
      </section>

      <section aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">11. Your Privacy Rights</h2>
        <p>
          Depending on your location and applicable laws, you may have the right
          to:
        </p>
        <ul>
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate personal information.</li>
          <li>Request deletion of personal information.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Object to or restrict certain types of data processing.</li>
        </ul>
        <p>
          You can also clear locally stored information through your browser
          settings.
        </p>
        <p>
          To exercise applicable privacy rights regarding information we hold,
          contact us using the details below.
        </p>
      </section>

      <section aria-labelledby="policy-changes">
        <h2 id="policy-changes">12. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our website, tools, third-party services, or applicable legal
          requirements.
        </p>
        <p>
          Any changes will be published on this page with an updated &quot;Last
          updated&quot; date.
        </p>
        <p>We encourage visitors to review this page periodically.</p>
      </section>

      <section aria-labelledby="contact-us">
        <h2 id="contact-us">13. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data practices, you can contact us through:
        </p>
        <LegalContact />
      </section>

      <hr />

      <p>
        By using {siteConfig.name}, you acknowledge that you have read and
        understood this Privacy Policy.
      </p>
    </LegalPage>
  );
}
