import { siteConfig } from "@config/site";
import { LegalContact, LegalPage } from "@site/components/LegalPage";

// Source: docs/terms-and-conditions.md. Keep both in sync.
export default function TermsAndConditions() {
  return (
    <LegalPage title="Terms and Conditions" lastUpdated="November 2, 2026">
      <p>
        Welcome to <strong>{siteConfig.name}</strong> (
        <code>{siteConfig.url}</code>). These Terms and Conditions govern your
        access to and use of our website and the tools and services provided
        through it.
      </p>
      <p>
        By accessing or using this website, you agree to these Terms and
        Conditions. If you do not agree with any part of these terms, please
        discontinue using the website.
      </p>

      <section aria-labelledby="about-our-website">
        <h2 id="about-our-website">1. About Our Website</h2>
        <p>
          {siteConfig.name} provides free online tools and utilities designed to
          help users perform various tasks through their web browsers.
        </p>
        <p>Our tools may include:</p>
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
          We reserve the right to add, modify, suspend, or discontinue any tool
          or feature at any time without prior notice.
        </p>
      </section>

      <section aria-labelledby="acceptable-use">
        <h2 id="acceptable-use">2. Acceptable Use</h2>
        <p>You agree to use our website and tools only for lawful purposes.</p>
        <p>You must not:</p>
        <ul>
          <li>
            Use the website for any illegal, fraudulent, or unauthorized
            activity.
          </li>
          <li>
            Attempt to disrupt, damage, or interfere with the website or its
            infrastructure.
          </li>
          <li>
            Attempt to gain unauthorized access to our systems or services.
          </li>
          <li>
            Upload, process, or use content that violates another person&apos;s
            rights or applicable laws.
          </li>
          <li>
            Attempt to bypass security measures or exploit vulnerabilities.
          </li>
          <li>
            Use automated methods to abuse, overload, or interfere with our
            services.
          </li>
          <li>
            Copy, redistribute, or commercially exploit our website&apos;s
            content or code in violation of applicable licenses or intellectual
            property rights.
          </li>
        </ul>
        <p>
          We reserve the right to restrict access to users who violate these
          terms.
        </p>
      </section>

      <section aria-labelledby="file-processing">
        <h2 id="file-processing">3. Use of Online Tools and File Processing</h2>
        <p>
          Our tools are designed to process user-selected files and inputs
          directly within the browser wherever applicable.
        </p>
        <p>For tools that perform local processing:</p>
        <ul>
          <li>Files and inputs are processed on your device.</li>
          <li>Files are not intentionally uploaded to our servers.</li>
          <li>
            Certain application data and preferences may be stored in your
            browser&apos;s local storage.
          </li>
          <li>
            Clearing browser data or local storage may remove saved information.
          </li>
        </ul>
        <p>
          You are responsible for ensuring that the files you select are valid,
          safe, and appropriate for processing.
        </p>
        <p>
          We do not guarantee that every file format, file size, or input
          structure will be supported.
        </p>
        <p>
          You should maintain your own copies of important files before using
          our tools. We are not responsible for data loss resulting from browser
          issues, device failures, user actions, or tool errors.
        </p>
      </section>

      <section aria-labelledby="third-party-platforms">
        <h2 id="third-party-platforms">
          4. Third-Party Platforms and Compatibility
        </h2>
        <p>
          Some tools may work with data exported from or associated with
          third-party platforms, including Instagram.
        </p>
        <p>
          {siteConfig.name} is an independent project and is not affiliated
          with, endorsed by, sponsored by, or officially associated with Meta,
          Instagram, or other third-party platforms unless explicitly stated.
        </p>
        <p>
          We do not control third-party platforms, their services, policies,
          data formats, or availability.
        </p>
        <p>
          Changes made by third-party platforms may affect the functionality or
          compatibility of our tools.
        </p>
        <p>
          You are responsible for complying with the terms and policies of any
          third-party platform whose data or services you use.
        </p>
      </section>

      <section aria-labelledby="accuracy">
        <h2 id="accuracy">5. Accuracy and Reliability</h2>
        <p>
          We make reasonable efforts to ensure that our tools function as
          intended.
        </p>
        <p>However, we do not guarantee that:</p>
        <ul>
          <li>
            Results generated by our tools will always be accurate or complete.
          </li>
          <li>
            All tools will work with every browser, device, or file format.
          </li>
          <li>The website will always be available without interruptions.</li>
          <li>Errors, bugs, or compatibility issues will never occur.</li>
        </ul>
        <p>
          You are responsible for independently verifying important results
          before relying on them.
        </p>
        <p>
          Tools are provided for convenience and informational purposes and
          should not be treated as a substitute for professional advice or
          official information.
        </p>
      </section>

      <section aria-labelledby="intellectual-property">
        <h2 id="intellectual-property">6. Intellectual Property</h2>
        <p>
          Unless otherwise stated, the website&apos;s original content,
          branding, design, graphics, and original software are owned by or
          licensed to {siteConfig.name}.
        </p>
        <p>
          You may not reproduce, distribute, modify, or commercially exploit
          proprietary website content without prior permission, except where
          permitted by applicable law or an applicable open-source license.
        </p>
        <p>
          Some components of our website may use third-party open-source
          libraries, frameworks, icons, and other resources. These remain
          subject to their respective licenses and attribution requirements.
        </p>
        <p>
          Where applicable, relevant acknowledgements and third-party credits
          may be provided on our <a href="/credits/">Credits</a> page.
        </p>
      </section>

      <section aria-labelledby="advertising">
        <h2 id="advertising">7. Advertising and Third-Party Services</h2>
        <p>
          We may display advertisements through Google AdSense or other
          advertising providers.
        </p>
        <p>
          Third-party advertising providers may use cookies or similar
          technologies to display and measure advertisements, subject to their
          respective policies and applicable consent requirements.
        </p>
        <p>
          We may also use third-party services for hosting, website delivery,
          analytics, and security.
        </p>
        <p>
          We are not responsible for the content, products, services, or privacy
          practices of third-party providers.
        </p>
        <p>
          Interactions with third-party advertisements or external websites are
          at your own discretion and risk.
        </p>
      </section>

      <section aria-labelledby="external-links">
        <h2 id="external-links">8. External Links</h2>
        <p>Our website may contain links to external websites and resources.</p>
        <p>
          These links are provided for convenience and informational purposes.
        </p>
        <p>
          We do not control or guarantee the accuracy, availability, security,
          or content of external websites. Visiting external websites is subject
          to their own terms and privacy policies.
        </p>
      </section>

      <section aria-labelledby="warranties">
        <h2 id="warranties">9. Disclaimer of Warranties</h2>
        <p>
          Our website and all tools are provided on an{" "}
          <strong>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot;</strong> basis,
          without warranties of any kind, whether express or implied, to the
          maximum extent permitted by applicable law.
        </p>
        <p>
          We do not guarantee uninterrupted availability, error-free operation,
          accuracy, reliability, or suitability for any particular purpose.
        </p>
        <p>
          Your use of the website and its tools is entirely at your own risk.
        </p>
      </section>

      <section aria-labelledby="liability">
        <h2 id="liability">10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.name}{" "}
          and its owners, contributors, and affiliates shall not be liable for
          any direct, indirect, incidental, consequential, or special damages
          arising from or related to:
        </p>
        <ul>
          <li>Your use or inability to use the website.</li>
          <li>
            Errors, inaccuracies, or incomplete results generated by our tools.
          </li>
          <li>Loss or corruption of files or locally stored data.</li>
          <li>Browser, device, or software compatibility issues.</li>
          <li>Changes or interruptions to third-party services.</li>
          <li>
            Unauthorized access to or alteration of information on your device.
          </li>
          <li>Reliance on information or results provided by our tools.</li>
        </ul>
        <p>
          Nothing in these terms excludes or limits liability that cannot
          legally be excluded or limited under applicable law.
        </p>
      </section>

      <section aria-labelledby="indemnification">
        <h2 id="indemnification">11. Indemnification</h2>
        <p>
          You agree to be responsible for your use of the website and, to the
          extent permitted by applicable law, to indemnify and hold harmless{" "}
          {siteConfig.name} and its owners and contributors against claims,
          liabilities, damages, losses, and expenses arising from your unlawful
          use of the website or violation of these Terms and Conditions.
        </p>
      </section>

      <section aria-labelledby="changes">
        <h2 id="changes">12. Changes to the Website and Terms</h2>
        <p>
          We reserve the right to modify, update, suspend, or discontinue any
          part of the website or its services at any time.
        </p>
        <p>
          We may also update these Terms and Conditions to reflect changes in
          our services, operations, or legal requirements.
        </p>
        <p>
          Updated terms will be published on this page with a revised &quot;Last
          updated&quot; date.
        </p>
        <p>
          Your continued use of the website after changes are published
          constitutes acceptance of the updated terms, to the extent permitted
          by applicable law.
        </p>
      </section>

      <section aria-labelledby="governing-law">
        <h2 id="governing-law">13. Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed by and interpreted in
          accordance with the applicable laws of India.
        </p>
        <p>
          Any disputes arising in connection with the use of this website shall
          be subject to the jurisdiction of the competent courts in Goa, India,
          subject to applicable law.
        </p>
      </section>

      <section aria-labelledby="contact-us">
        <h2 id="contact-us">14. Contact Us</h2>
        <p>
          If you have any questions regarding these Terms and Conditions, you
          can contact us through:
        </p>
        <LegalContact />
      </section>

      <hr />

      <p>
        By using {siteConfig.name}, you acknowledge that you have read,
        understood, and agreed to these Terms and Conditions.
      </p>
    </LegalPage>
  );
}
