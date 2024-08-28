'use server';

import Link from "next/link";

export default async function RootServer() {
    return (
        <Link className="navbar-brand" href="/">
            GitTix
        </Link>
    )
}