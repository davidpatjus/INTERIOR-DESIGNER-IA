import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
	const { user } = await req.json();

    try {
        
    // If User Exist on DB
			const userInfo = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress.emailAddress))
			console.log("userInfo", userInfo);

    // If User Not Exist on DB
		if (userInfo?.length === 0) {
			const SaveResult = await db.insert(Users).values({
				name: user?.fullName,
				email: user?.primaryEmailAddress.emailAddress,
				imageUrl: user?.imageUrl
			}).returning({ id: Users.id, name: Users.name, email: Users.email, imageUrl: Users.imageUrl })

			return NextResponse.json({ result: SaveResult[0] });
		}

		return NextResponse.json({ result: userInfo[0] });

    } catch (error) {
			console.log(error);
        return NextResponse.json({ error: error });
    }

}