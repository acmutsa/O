import { db, eq } from ".";
import {user} from "./schema"

export async function getUser(userID:string){
  return db.query.user.findFirst({
    where:eq(user.id, userID)
  })
}