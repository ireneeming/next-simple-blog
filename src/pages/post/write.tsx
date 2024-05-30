/* eslint-disable no-undef */
import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import Layout from "../../components/Layout";

export default function Write() {
 const idRef = useRef<HTMLInputElement>(null);
 const titleRef = useRef<HTMLInputElement>(null);
 const contentRef = useRef<HTMLTextAreaElement>(null);

 const [showLink, setShowLink] = useState(false);

 const handleSumbit = (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();

  const id = idRef.current?.value;
  const title = titleRef.current?.value;
  const content = contentRef.current?.value;

  if (id && title && content) {
   fetch("/api/post/write", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     id,
     title,
     content,
    }),
   })
    .then((response) => {
     if (response.ok) {
      return response.json();
     }
     throw new Error("Fetch Error");
    })
    .then((data) => {
     setShowLink(true);
     alert(data.message);
    })
    .catch((error) => alert(`request error: ${error}`));
  }
 };
 return (
  <Layout home={false}>
   <h1>Write a post </h1>

   <form onSubmit={handleSumbit} className="p-4">
    <div className="border-2 border-slate-300 w-2/4 p-2 rounded-md">
     <input
      type="text"
      name="id"
      placeholder="id"
      required
      ref={idRef}
      className="w-full"
     />
    </div>

    <div className="border-2 border-slate-300 w-2/4 p-2 rounded-md mt-4">
     <input
      type="text"
      name="title"
      placeholder="title"
      required
      ref={titleRef}
      className="w-full"
     />
    </div>
    <div className="border-2 border-slate-300 w-2/4 p-2 rounded-md mt-4">
     <textarea
      name="content"
      placeholder="content"
      required
      ref={contentRef}
      className="w-full"
     />
    </div>

    <input
     type="submit"
     value="Create"
     className="w-2/4 p-2 rounded-md mt-4 bg-pink-500 px-2 cursor-pointer"
    />
   </form>

   {showLink && (
    <Link
     href={`http://localhost/posts/${idRef.current?.value}`}
     replace
     scroll={false}
    >
     Go To Created Post
    </Link>
   )}
  </Layout>
 );
}
