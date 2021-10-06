import Head from "next/head";
import Link from "next/link";
import { Editor } from "../components/Editor";
import { Logo } from "../components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>Tailwind Preview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-xl w-full px-4">
        <p className="text-gray-500 text-sm">
          Select an HTML snippet and hover to preview:
        </p>
        <div className="shadow border h-64 mt-4">
          <Editor />
        </div>
      </div>
      <div className="fixed bottom-8 right-8 w-16 opacity-20">
        <Link href="https://mattrothenberg.com">
          <a target="_blank" className="block">
            <Logo />
          </a>
        </Link>
      </div>
    </div>
  );
}
