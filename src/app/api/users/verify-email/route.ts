import userModel from "@/models/user.models";
import { NextResponse } from "next/server";


export async function POST({ params }: { params: { verificationToken : string}}) {
    try {
        const {verificationToken} = await params.verificationToken;
        if(!verificationToken) {
            return NextResponse.json({
                message: "Verification token is missing",
                success: false
            });
        }
        const user = await userModel.findOne({ verifyToken: verificationToken, $gt: { verifyTokenExpiry: Date.now()}});

        if(!user) {
            return NextResponse.json({
                message: "Verification token is expired",
                success: false 
            });
        }

        user.isVerified = true;
        await user?.save();

        return NextResponse.json({
            message: "You are verified",
            success: true 
        }, {
            status: 200
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error while verifying email",
            success: false
        }, {
            status: 500
        });
    }
}