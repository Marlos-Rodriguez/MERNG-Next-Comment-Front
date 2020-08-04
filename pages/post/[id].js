import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Layout from "../../Components/layout/layout";

const Post = () => {
  //Routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id: id },
  } = router;

  const { loading, data, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      id,
    },
  });

  if (!loading) {
    console.log(data);
    console.log(error);
  }

  console.log(id);

  return (
    <Layout>
      <h1>{id}</h1>
    </Layout>
  );
};

const FETCH_POST_QUERY = gql`
  query($id: ID!) {
    getPost(postId: $id) {
      id
    }
  }
`;

export default Post;
