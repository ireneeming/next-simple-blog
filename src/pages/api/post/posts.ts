// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { allPostsData } from "../../../lib/posts";

// export default function handler(
//  req: NextApiRequest,
//  res: NextApiResponse<any>
// ) {
//  res.status(200).json({ allPostsData });
//  console.log(res);
// }

import { getSortedPostsData } from "../../../../lib/posts";

export default function handler(req, res) {
 const allPostsData = getSortedPostsData();
 res.status(200).json({ allPostsData });
}
