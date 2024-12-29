import { readDB, writeDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { id: string } }) {

    try {
        const db = await readDB();

        const post = db.posts.find((p: any) => p.id === parseInt(params.id));

        if (!post) {
            return {
                status: 404,
                json: {
                    error: 'Post not found',
                }
            }
        }

        return NextResponse.json(post);


    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch post',
        }, {
            status: 500,
        })
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const body = await request.json();
      const db = await readDB();
      const postIndex = db.posts.findIndex((p: any) => p.id === parseInt(params.id));
      
      if (postIndex === -1) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      
      db.posts[postIndex] = {
        ...db.posts[postIndex],
        ...body,
      };
      
      await writeDB(db);
      return NextResponse.json(db.posts[postIndex]);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }
  }

  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const db = await readDB();
      const postIndex = db.posts.findIndex((p: any) => p.id === parseInt(params.id));
      
      if (postIndex === -1) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      
      db.posts.splice(postIndex, 1);
      await writeDB(db);
      
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }
  }