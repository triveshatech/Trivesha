import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // For development
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  // Thank you email to user
  userThankYou: (contactData) => {
    return {
      subject: "Thank You for Contacting Trivesha Tech! 🚀",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - Trivesha Tech</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
            .header p { color: #e8eaf6; margin: 10px 0 0 0; font-size: 16px; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 20px; color: #667eea; margin-bottom: 20px; font-weight: 600; }
            .message { font-size: 16px; margin-bottom: 25px; line-height: 1.7; }
            .project-summary { background: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
            .project-summary h3 { margin: 0 0 15px 0; color: #667eea; font-size: 18px; }
            .project-detail { margin: 8px 0; }
            .project-detail strong { color: #333; }
            .next-steps { background: #e8f5e8; border-radius: 8px; padding: 20px; margin: 25px 0; }
            .next-steps h3 { color: #2e7d32; margin: 0 0 15px 0; }
            .next-steps ul { margin: 10px 0; padding-left: 20px; }
            .next-steps li { margin: 5px 0; }
            .contact-info { background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; }
            .footer { background: #2c3e50; color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; }
            .footer a { color: #3498db; text-decoration: none; }
            .social-links { margin: 15px 0; }
            .social-links a { display: inline-block; margin: 0 10px; padding: 8px 12px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Trivesha Tech</h1>
              <p>Your Digital Transformation Partner</p>
            </div>
            
            <div class="content">
              <div class="greeting">Hi ${contactData.name}! 👋</div>
              
              <div class="message">
                Thank you for reaching out to <strong>Trivesha Tech</strong>! We're excited about the possibility of working together on your project.
              </div>
              
              <div class="project-summary">
                <h3>📋 Your Project Summary</h3>
                <div class="project-detail"><strong>Project Type:</strong> ${contactData.projectType}</div>
                <div class="project-detail"><strong>Budget Range:</strong> ${contactData.budget}</div>
                <div class="project-detail"><strong>Timeline:</strong> ${contactData.timeline}</div>
                <div class="project-detail"><strong>Company:</strong> ${contactData.company}</div>
                <div class="project-detail"><strong>Message:</strong></div>
                <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 4px; font-style: italic;">
                  "${contactData.message}"
                </div>
              </div>
              
              <div class="next-steps">
                <h3>🎯 What Happens Next?</h3>
                <ul>
                  <li><strong>Within 2-4 hours:</strong> Our team will review your requirements</li>
                  <li><strong>Within 24 hours:</strong> We'll send you a detailed proposal with timeline and pricing</li>
                  <li><strong>Within 48 hours:</strong> Schedule a call to discuss your project in detail</li>
                </ul>
              </div>
              
              <div class="message">
                In the meantime, feel free to check out our <a href="https://trivesha.tech/portfolio" style="color: #667eea;">recent projects</a> 
                to see the quality of work we deliver.
              </div>
              
              <div class="contact-info">
                <h3 style="margin: 0 0 15px 0; color: #667eea;">📞 Need Immediate Assistance?</h3>
                <p style="margin: 5px 0;"><strong>Email:</strong> trivesha.tech@gmail.com</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> +91 73309 75148</p>
                <p style="margin: 5px 0;"><strong>Business Hours:</strong> Mon-Fri, 9AM-7PM IST</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Best regards,<br><strong>The Trivesha Tech Team</strong></p>
              <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
                <a href="https://github.com/triveshatech">GitHub</a>
              </div>
              <p>© 2024 Trivesha Tech. Transforming ideas into digital reality.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hi ${contactData.name}!

Thank you for contacting Trivesha Tech! We've received your project inquiry and our team is excited to work with you.

Project Summary:
- Project Type: ${contactData.projectType}
- Budget: ${contactData.budget}
- Timeline: ${contactData.timeline}
- Company: ${contactData.company}
- Message: ${contactData.message}

What's Next:
- Within 2-4 hours: Our team will review your requirements
- Within 24 hours: You'll receive a detailed proposal
- Within 48 hours: We'll schedule a project discussion call

Contact us anytime:
Email: trivesha.tech@gmail.com
Phone: +91 73309 75148

Best regards,
The Trivesha Tech Team`,
    };
  },

  // Notification email to admin
  adminNotification: (contactData) => {
    return {
      subject: `🚨 New Contact Form Submission - ${contactData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Submission</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 700px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 25px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .urgent-banner { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin-bottom: 25px; }
            .contact-details { background: #f8f9fa; border-radius: 8px; padding: 25px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #495057; min-width: 120px; }
            .detail-value { color: #212529; flex: 1; margin-left: 20px; }
            .message-section { background: #e7f3ff; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .priority-high { background: #ffebee !important; border-left-color: #f44336 !important; }
            .action-buttons { text-align: center; margin: 30px 0; }
            .btn { display: inline-block; padding: 12px 24px; margin: 0 10px; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .btn-primary { background: #007bff; color: white; }
            .btn-success { background: #28a745; color: white; }
            .metadata { background: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 14px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Contact Form Submission</h1>
              <p>Priority: ${
                contactData.budget && contactData.budget.includes("₹3L+")
                  ? "HIGH"
                  : "MEDIUM"
              }</p>
            </div>
            
            <div class="content">
              <div class="urgent-banner">
                <strong>⚡ Action Required:</strong> A new potential client has submitted a project inquiry. 
                Response time directly impacts conversion rate!
              </div>
              
              <div class="contact-details">
                <h2 style="margin-top: 0; color: #e74c3c;">👤 Contact Information</h2>
                <div class="detail-row">
                  <span class="detail-label">Full Name:</span>
                  <span class="detail-value"><strong>${
                    contactData.name
                  }</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${
                    contactData.email
                  }" style="color: #007bff;">${contactData.email}</a></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Company:</span>
                  <span class="detail-value">${contactData.company}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value"><a href="tel:${
                    contactData.phone
                  }" style="color: #007bff;">${contactData.phone}</a></span>
                </div>
              </div>
              
              <div class="contact-details">
                <h2 style="margin-top: 0; color: #e74c3c;">🎯 Project Details</h2>
                <div class="detail-row">
                  <span class="detail-label">Project Type:</span>
                  <span class="detail-value"><strong>${
                    contactData.projectType
                  }</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Budget Range:</span>
                  <span class="detail-value"><strong style="color: #28a745;">${
                    contactData.budget
                  }</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Timeline:</span>
                  <span class="detail-value">${contactData.timeline}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Submitted:</span>
                  <span class="detail-value">${contactData.submittedAt}</span>
                </div>
              </div>
              
              <div class="message-section ${
                contactData.budget && contactData.budget.includes("₹3L+")
                  ? "priority-high"
                  : ""
              }">
                <h3 style="margin-top: 0; color: #2196f3;">💬 Project Message</h3>
                <p style="margin-bottom: 0; white-space: pre-wrap; font-style: italic;">
                  "${contactData.message}"
                </p>
              </div>
              
              <div class="action-buttons">
                <a href="mailto:${
                  contactData.email
                }?subject=Re: Your Project Inquiry - Trivesha Tech&body=Hi ${
        contactData.name
      },%0D%0A%0D%0AThank you for your interest in working with Trivesha Tech..." class="btn btn-primary">
                  📧 Reply to Client
                </a>
                <a href="tel:${contactData.phone}" class="btn btn-success">
                  📞 Call Now
                </a>
              </div>
              
              <div class="metadata">
                <strong>📊 Submission Metadata:</strong><br>
                Contact ID: ${contactData.id}<br>
                Source: Website Contact Form<br>
                IP Address: ${contactData.ipAddress || "Not available"}<br>
                User Agent: ${contactData.userAgent || "Not available"}
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `NEW CONTACT FORM SUBMISSION

Contact Information:
- Name: ${contactData.name}
- Email: ${contactData.email}
- Company: ${contactData.company}
- Phone: ${contactData.phone}

Project Details:
- Type: ${contactData.projectType}
- Budget: ${contactData.budget}
- Timeline: ${contactData.timeline}
- Submitted: ${contactData.submittedAt}

Message:
${contactData.message}

Contact ID: ${contactData.id}

Please respond to this inquiry promptly to maintain high conversion rates.`,
    };
  },
};

// Send thank you email to user
export const sendUserThankYou = async (contactData) => {
  const template = emailTemplates.userThankYou(contactData);
  return await sendEmail({
    to: contactData.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
};

// Send notification email to admin
export const sendAdminNotification = async (contactData) => {
  const template = emailTemplates.adminNotification(contactData);
  return await sendEmail({
    to: process.env.ADMIN_NOTIFICATION_EMAIL,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email configuration is valid");
    return { success: true, message: "Email configuration is valid" };
  } catch (error) {
    console.error("❌ Email configuration error:", error);
    return { success: false, error: error.message };
  }
};

export default {
  sendEmail,
  sendUserThankYou,
  sendAdminNotification,
  testEmailConfig,
};
