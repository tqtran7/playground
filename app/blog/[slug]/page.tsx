import Link from "next/link";


interface BlogProp {
    params: Promise<{ slug: string }>
}

export default async function Blog({ params }: BlogProp) {

    const { slug } = await params;

    return (
        <div>
            This page will display individual blog: {slug}
            <Link href='/blog'>Back</Link>
        </div>
    );
}
