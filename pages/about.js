

import Link from "next/link"


export default function About() {
    return(
        <div >
            <h1 >About</h1>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    )
}