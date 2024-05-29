import Head from "next/head";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import { getAllPostIds, getPostData } from "../../../lib/posts";

export async function getStaticPaths() {
 const paths = getAllPostIds(); // 목록 가져옴
 return {
  paths,
  fallback: false, // 빌드 시 생성되지 않은 페이지에 대한 처리 : false: 404 / true: fallback 동작으로 로더 보여주고 / blocking: 안그리고있다가 데이터가 오면 그때 그린다
 };
}

export async function getStaticProps({ params }) {
 const postData = await getPostData(params.id); // 실제 데이터 가져옴
 return {
  props: {
   postData,
  },
 };
}

export default function Post({ postData }) {
 return (
  <Layout>
   <Head>
    <title>{postData.title}</title>
   </Head>

   <p># {postData.id}</p>
   <h1 className="text-lg bold font-bold">{postData.title}</h1>

   <Date dateString={postData.date} />
   <br />
   <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>
 );
}
