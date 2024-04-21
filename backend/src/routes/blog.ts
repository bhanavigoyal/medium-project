import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {verify} from 'hono/jwt';
import { createPostInput, updatePostInput} from "@bhanavigoyal/common";

export const blogRouter = new Hono<{            //to specify the data type of env variables so that typescript does not complain in line 14
    Bindings:{
      DATABASE_URL: string
      JWT_SECRET: string
    }
    Variables:{
      userId: string
    }
}>()

blogRouter.use('*', async (c,next)=>{
  const authHeader = c.req.header("Authorization");
  if(!authHeader){
    c.status(403)
    return c.json({error: "failed authorization"})
  }
  // const token = authHeader.split(' ')[1];
  const token = authHeader;
  try{
    const decodedToken = await verify(token,c.env.JWT_SECRET);

    if(decodedToken.id){
      c.set('userId', decodedToken.id);
      await next();
    }else{
      c.status(403)
      return c.json({error: "unauthorized"})
    }

  }catch(err){
      c.status(403)
      return c.json({error: "unauthorized"})
  }
})

blogRouter.post('/', async (c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success} = createPostInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }
    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });

    return c.json({
        id:post.id
    })
})

blogRouter.put('/', async(c)=>{
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  const {success} = updatePostInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }
    
  try{
  prisma.post.update({
    where:{
        id: body.id,
        authorId: userId
    },
    data:{
        title: body.title,
        content: body.content
    }
  })
}catch(e){
    return c.status(403)
}

  return c.text('post updated');

})

blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const posts = await prisma.post.findMany({
          select:{
            content:true,
            title:true,
            id: true,
            author:{
              select:{
                name:true
              }
            }
          }
        });
        return c.json({posts});
    }catch(e){
        return c.status(403)
    }

})

blogRouter.get('/:id', async(c)=>{
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where:{
        id: id
    },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
    }
  })

  return c.json(post);
  
})

export default blogRouter;