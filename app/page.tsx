import ButtonClicker from "@/components/ButtonClicker";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Hello world</p>
      <ButtonClicker/>
      <Link href='/blog'>Go to blog</Link>
    </div>
  );
}
