"use server"
import { userAction } from "@/lib/safe-action";
import { auth } from "@/lib/auth";

export const signUserOut = userAction.action(async ({ctx:{
  headers
}})=>{
  
  const success = await auth.api.signOut({
    headers
  })
  
  return {
    success
  }
})