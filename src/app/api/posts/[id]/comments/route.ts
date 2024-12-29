import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await readDB();
    const comments = db.comments.filter(
      (c: any) => c.postId === parseInt(params.id)
    );
    
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = await readDB();
    
    const newComment = {
      id: db.comments.length + 1,
      postId: parseInt(params.id),
      ...body,
    };
    
    db.comments.push(newComment);
    await writeDB(db);
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}