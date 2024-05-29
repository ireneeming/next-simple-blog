import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout.tsx";
import Link from "next/link";
import Date from "../components/date";
import { getSortedPostsData } from "../../lib/posts";
import utilStyles from "../styles/utils.module.css";

// export async function getServerSideProps() {
//  const allPostsData = getSortedPostsData();
//  return {
//   props: {
//    allPostsData,
//   },
//  };
// }

export async function getStaticProps() {
 const allPostsData = getSortedPostsData();

 return {
  props: {
   allPostsData,
  },
 };
}

export default function Home({ allPostsData }) {
 //  const [allPostsData, setAllPostsData] = useState([]);

 //  useEffect(() => {
 //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/posts`)
 //    .then((res) => res.json())
 //    .then((data) => setAllPostsData(data.allPostsData));
 //  }, []);

 return (
  <Layout home>
   <Head>
    <title>{siteTitle}</title>
   </Head>
   <section>
    <p>i love coding</p>
   </section>
   {/* Add this <section> tag below the existing <section> tag */}
   <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className="font-bold text-2xl mb-4 mt-4">Blog</h2>
    <ul className={utilStyles.list}>
     {allPostsData.map(({ id, date, title }) => (
      <li className="text-lg mb-4" key={id}>
       <Link href={`/posts/${id}`}>{title}</Link>
       <br />
       <small className="text-sm text-slate-400">
        <Date dateString={date} />
       </small>
      </li>
     ))}
    </ul>
   </section>
  </Layout>
 );
}
