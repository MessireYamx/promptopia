import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import {connectToDB} from "@utils/database";

// Log the environment variables to check if they are loaded correctly
console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            // Add any session handling logic here
            const sessionUser = await User.findOne({ email: session.user.email });

            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // Check if the user already exists in the database
                const userExist = await User.findOne({ email: profile.email });

                // If the user does not exist, create a new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },

});


export { handler as GET, handler as POST };
