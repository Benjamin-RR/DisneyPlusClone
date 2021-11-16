import { gql, GraphQLClient} from 'graphql-request';

export const getStaticProps = async () => {

  const url = `${process.env.REACT_APP_GRAPHCMS_URL}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : `Bearer ${process.env.REACT_APP_GRAPHCMS_APIKEY}`
    }
  })
  console.log('check:',`${process.env.REACT_APP_GRAPHCMS_URL}`);
  console.log('check2:',`${process.env.REACT_APP_GRAPHCMS_APIKEY}`);

  const query = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  // console.log('data:', data);
  const videos = data.videos;
  return{
    props: {
      videos
    }
  }
}

const Home = ({videos}) => {
  console.log('videos:', videos);
  return (
    <div>Hello there.</div>
  )
}

export default Home