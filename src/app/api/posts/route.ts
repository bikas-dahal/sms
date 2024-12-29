import { readDB, writeDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url, 'http://localhost:3000');
        console.log('url', url);
        const searchParams  = url.searchParams;
    
        const page = parseInt(searchParams.get('_page') || '1');
        const limit = parseInt(searchParams.get('_limit') || '10');
    
        const db = await readDB();
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = db.posts.slice(startIndex, endIndex);
    
        console.log('object', { posts: paginatedPosts, page, limit });
    
        const response = NextResponse.json(paginatedPosts);
        response.headers.set('x-total-count', db.posts.length.toString());
    
        return response;
        
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch posts',
        }, {
            status: 500,
        })
    }
}


export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json()
        const db = await readDB();

        console.log('db', db);

        const newPost = {
            id: db.posts.length + 1,
            ...body,
            userId: body.userId || 1,
          };

          db.posts.push(newPost);
          await writeDB(db);

          return NextResponse.json(newPost, { status: 201 });


    } catch (error) {
        return NextResponse.json({
            error: 'Failed to create post',
        }, {
            status: 500,
        })
        
    }
}