/*
This file is for any Any database functions that occur more than twice. 
This not only ensures a signle source of truth for the function, but also allows for easier testing and debugging.
*/
import { db, eq } from ".";
import {user} from "./schema"

export async function getUser(userID:string){
  return db.query.user.findFirst({
    where:eq(user.id, userID)
  })
}