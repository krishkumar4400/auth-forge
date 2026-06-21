"use client"

import Link from "next/link";

export default function ProfilePage () {
    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <p>
                    <Link href={'/logout'}>
                        Go To Logout</Link>
                </p>
            </div>
        </div>
    )
}