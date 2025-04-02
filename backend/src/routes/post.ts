import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string; 
    }
}>();

postRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const response = await verify(header, c.env.JWT_SECRET);
    if (response) {
        c.set("userId", response.id as string);
        await next();
    } else {
        c.status(403);
        return c.json({ error: "unauthorized" })
    }
})

postRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId

        }
    })
    return c.json({
        id : blog.id
    })
})

postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const blog = await prisma.post.update({
        where : {
            id : body.id
        },
        data: {
            title: body.title,
            content: body.content

        }
    })
    return c.json({
        id : blog.id
    })
})

postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            },
        })

        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            message : "error while fetching blog post"
        });
    }
})

postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    })
}) 