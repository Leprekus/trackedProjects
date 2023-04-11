import { NextRequest, NextResponse } from 'next/server';

export default async function GET(req: Request) {
  return NextResponse.json({ message: 'success'})
}