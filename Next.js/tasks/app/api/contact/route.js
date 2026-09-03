import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, category, message } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // Process submission (simulated database or email dispatch)
    const timestamp = new Date().toISOString();
    const referenceId = 'REQ-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your inquiry has been logged successfully.`,
      referenceId,
      timestamp,
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        category: category || 'General',
        messagePreview: message.substring(0, 60) + (message.length > 60 ? '...' : '')
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'API Route Active',
    endpoint: '/api/contact',
    methodsAllowed: ['POST', 'GET'],
    schema: {
      name: 'string (required)',
      email: 'valid email (required)',
      subject: 'string (optional)',
      category: 'string (optional)',
      message: 'string (min 10 chars, required)'
    }
  });
}
