import Link from "next/link"


export default function contact() {
    return(
    <div >
        <h1 >Contact</h1>

        <ul>
            <li>
                <Link href="/">
                    Home
                </Link>
            </li>
            <li>
                <Link href="/about">
                    About
                </Link>
            </li>
        </ul>
    </div>
    )
}