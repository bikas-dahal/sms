import { NextRequest, NextResponse } from "next/server";

let todos = [{ id: 1, title: 'Next.js', completed: false }];

export async function GET(req: NextRequest) {
    console.log('req', req);
    return NextResponse.json({ todos });
  }

  export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('body', body);
    const newTodo = { id: todos.length + 1, ...body };
    todos.push(newTodo);
    return NextResponse.json({ todos }, {status: 201});
  }

