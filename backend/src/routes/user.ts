import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign} from 'hono/jwt';
import {signinInput, signupInput} from "@bhanavigoyal/common"

export const userRouter = new Hono<{            //to specify the data type of env variables so that typescript does not complain in line 14
    Bindings:{
      DATABASE_URL: string
      JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }
    try{
      const existingUser = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      });
      if(existingUser){
        c.status(411)
        return c.json({
            error: "user already exists with the give email"
        })
      }
  
      const user = await prisma.user.create({
        data:{
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        jwt:jwt
      });
    }catch(e){
      return c.status(403)
    }
  })
  
  userRouter.post('/signin', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }
    try{
      const foundUser =  await prisma.user.findUnique({
        where:{
          email:body.email,
          password: body.password
        }
      });
  
      if(foundUser){
        const jwt = await sign({id: foundUser.id}, c.env.JWT_SECRET);
        c.status(200)
        return c.json({jwt})
      }
      c.status(403);
      return c.json({error: "user not found"});
  
    }catch(e){
      return c.status(403)
    }
  })
  
export default userRouter