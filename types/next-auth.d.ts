import {IPLTeam} from "@/lib/types";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            teamId: string;
            team: IPLTeam;
        }
    }

    interface User {
        id: string;
        name: string;
        email: string;
        teamId: string;
        team: IPLTeam;
    };
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        teamId: string;
        team: IPLTeam;
    }
}