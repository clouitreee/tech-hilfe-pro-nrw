'use server';

import { Resend } from 'resend';
import { createLead } from '@/lib/supabase/client';
import { headers } from 'next/headers';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
  honeypot?: string; // Honeypot field
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // 0. Honeypot check - silent rejection
    if (data.honeypot && data.honeypot.trim() !== '') {
      // Pretend success to bots
      return { success: true };
    }

    // 1. Origin validation
    const headersList = await headers();
    const origin = headersList.get('origin') || headersList.get('referer') || '';
    const allowedOrigins = [
      'https://techhilfepro.de',
      'https://www.techhilfepro.de',
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ];
    
    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));
    if (!isAllowed && origin !== '') {
      console.error('Forbidden origin:', origin);
      return { success: false, error: 'Forbidden origin' };
    }

    // 2. Input validation and sanitization
    const name = String(data.name || '').trim().slice(0, 200);
    const email = String(data.email || '').trim().slice(0, 200);
    const phone = data.phone ? String(data.phone).trim().slice(0, 50) : undefined;
    const serviceInterest = String(data.serviceInterest || '').slice(0, 100);
    const message = String(data.message || '').trim().slice(0, 5000);

    // Basic validation
    if (!name || !email || !message) {
      return { success: false, error: 'Missing required fields' };
    }

    // Email format validation (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // 3. Save to Supabase via service role
    await createLead({
      name,
      email,
      phone,
      service_interest: serviceInterest,
      message,
    });

    // 2. Send email notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Tech Hilfe Pro Website <onboarding@resend.dev>', // Use verified domain
          to: 'info@techhilfepro.de',
          subject: '🔔 Neuer Lead von der Webseite!',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0A2A4E; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #0A2A4E; }
                .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">🎉 Neuer Lead von der Webseite!</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">👤 Name:</div>
                    <div class="value">${data.name}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">📧 E-Mail:</div>
                    <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                  </div>
                  
                  ${data.phone ? `
                  <div class="field">
                    <div class="label">📞 Telefon:</div>
                    <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
                  </div>
                  ` : ''}
                  
                  <div class="field">
                    <div class="label">🎯 Interesse:</div>
                    <div class="value">${getServiceLabel(data.serviceInterest)}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">💬 Nachricht:</div>
                    <div class="value">${data.message}</div>
                  </div>
                  
                  <div class="footer">
                    <p><strong>Nächste Schritte:</strong></p>
                    <ol>
                      <li>Innerhalb von 24 Stunden antworten</li>
                      <li>Lead in CRM eintragen</li>
                      <li>Erstgespräch vereinbaren</li>
                    </ol>
                    <p style="margin-top: 20px;">Diese E-Mail wurde automatisch von der Tech Hilfe Pro Website generiert.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the entire submission if email fails
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Submission failed' };
  }
}

function getServiceLabel(serviceInterest: string): string {
  const labels: Record<string, string> = {
    'private_basis': 'Digital-Sorglos-Paket Basis',
    'private_premium': 'Digital-Sorglos-Paket Premium',
    'business_grundschutz': 'Business-Grundschutz',
    'business_wachstum': 'Business-Wachstum',
    'business_premium': 'Business-Partner Premium',
    'general': 'Allgemeine Anfrage',
  };
  return labels[serviceInterest] || serviceInterest;
}
