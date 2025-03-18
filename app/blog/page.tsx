import Link from "next/link";

export default function Blogs() {
  return (
    <div>
      This page will list all of the blogs.
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog/blog1">blog1</Link></li>
        <li><Link href="/blog/blog2">blog2</Link></li>
        <li><Link href="/blog/blog3">blog3</Link></li>
      </ul>
    </div>
  );
}
