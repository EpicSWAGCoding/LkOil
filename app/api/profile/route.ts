import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { verifyJwtToken } from "@/lib/jwt";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await verifyJwtToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            include: {
                contractorBindings: {
                    include: {
                        contractor: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const contractor = user.contractorBindings[0]?.contractor;

        const profileData = {
            username: user.username, // Добавляем username
            name: contractor?.name || '',
            inn: contractor?.inn || '',
            kpp: '',
            phone: contractor?.phone || '',
            email: '',
            login: user.login,
            isAdmin: user.isAdmin
        };

        return NextResponse.json({ profile: profileData, isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
