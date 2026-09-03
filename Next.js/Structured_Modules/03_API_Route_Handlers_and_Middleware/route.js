import { NextResponse } from 'next/server';

/**
 * Next.js 15 Route Handler
 * Path: app/api/products/route.js
 * Supports native Web Request & Response standards
 */

let products = [
  { id: 1, title: 'Next.js 15 Full-Stack Course', price: 99 },
  { id: 2, title: 'FastAPI & AWS Cloud Masterclass', price: 129 }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');

  const result = limit ? products.slice(0, parseInt(limit)) : products;
  return NextResponse.json({
    status: 'success',
    count: result.length,
    data: result
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { error: 'Field "title" is required' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: Date.now(),
      title: body.title,
      price: body.price || 0
    };
    products.push(newProduct);

    return NextResponse.json(
      { message: 'Product created successfully', data: newProduct },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}
