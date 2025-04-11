import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('support');
    const collection = db.collection('tickets');

    // Save to MongoDB
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
      status: 'new',
    });

    // Send thank you email
    await resend.emails.send({
      from: 'support@fredonbytes.cloud',
      to: data.email,
      subject: data.language === 'cz' ? 'Děkujeme za vaši zprávu' : 'Thank you for your message',
      html:
        data.language === 'cz'
          ? `<p>Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.</p>`
          : `<p>Thank you for your message. We will contact you as soon as possible.</p>`,
    });

    // Send notification to support
    await resend.emails.send({
      from: 'support@fredonbytes.cloud',
      to: 'support@fredonbytes.cloud',
      subject: `New Support Ticket: ${data.project}`,
      html: `
        <h2>New Support Ticket</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Project:</strong> ${data.project}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    });

    await client.close();

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Error processing support request:', error);
    return NextResponse.json({ error: 'Failed to process support request' }, { status: 500 });
  }
}
