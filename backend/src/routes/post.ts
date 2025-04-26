import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@coder_prashant/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const response = await verify(header, c.env.JWT_SECRET);
    try {
        if (response) {
            c.set("userId", response.id as string);
            await next();
        }
    } catch (e) {
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
});

blogRouter.post('/post', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Invalid input"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)

        }
    });
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/post', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Invalid input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content

        }
    })
    return c.json({
        id: blog.id + " updated"
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select : {
            content : true,
            title : true,
            id: true,
            author : {
                select : {
                    name : true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name :true
                    }
                }
            }
        })

        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: "error while fetching blog post"
        });
    }
})