import { Resend } from "resend";

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }) {
    return this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    return this.sendEmail({
      to,
      subject: "Welcome to ApniSec 🚀",
      html: this.welcomeTemplate(name),
    });
  }

  async sendIssueCreatedEmail(to: string, issue: {
    title: string;
    type: string;
    description: string;
  }) {
    return this.sendEmail({
      to,
      subject: `New Issue Created: ${issue.title}`,
      html: this.issueCreatedTemplate(issue),
    });
  }

  /* ---------- Templates ---------- */

  private welcomeTemplate(name: string) {
    return `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome to ApniSec, ${name} 👋</h2>
        <p>
          Your account has been successfully created.
          You can now report and manage security issues with ease.
        </p>
        <p>
          Stay secure,<br/>
          <strong>ApniSec Team</strong>
        </p>
      </div>
    `;
  }

  private issueCreatedTemplate(issue: {
    title: string;
    type: string;
    description: string;
  }) {
    return `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Security Issue Created</h2>
        <p><strong>Title:</strong> ${issue.title}</p>
        <p><strong>Type:</strong> ${issue.type}</p>
        <p><strong>Description:</strong></p>
        <p>${issue.description}</p>

        <br/>
        <p>
          Our team will review this issue shortly.
        </p>

        <p>
          — ApniSec Security Platform
        </p>
      </div>
    `;
  }
}
