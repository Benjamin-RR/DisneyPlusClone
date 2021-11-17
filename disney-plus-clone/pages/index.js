import { gql, GraphQLClient} from 'graphql-request';
import Section from '../components/Sections';
import NavBar from '../components/NavBar';

export const getStaticProps = async () => {

  const url = `${process.env.REACT_APP_GRAPHCMS_URL}`;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : `Bearer ${process.env.REACT_APP_GRAPHCMS_APIKEY}`
    }
  })

  const videosQuery = gql`
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

  const accountQuery = gql`
    query {
      account(where: {id: "ckw1jo9sw3g8f0b39mg50m31d"}) {
        username,
        avatar {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return{
    props: {
      videos,
      account
    }
  }
}


const Home = ({videos, account}) => {

  // returns a random video from every video in the array of videos.
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  // returns videos of a specific genre
  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  // returns videos user has yet to see. (used for now as recommended section)
  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null);
  }

  return (
    <>
      <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />
        </div>
        <div className="video-feed"></div>
          {/* <a href='#disney'><div className='franchise' id='disney'></div></a> */}
          <Section genre={'Recommended'} videos={unSeenVideos(videos)} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')}/>
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')}/>
          <Section genre={'Suspense'} videos={filterVideos(videos, 'suspense')}/>
          <Section genre={'Drama'} videos={filterVideos(videos, 'drama')}/>
          <Section genre={'Science Fiction'} videos={filterVideos(videos, 'science fiction')}/>
          <Section genre={'Adventure'} videos={filterVideos(videos, 'adventure')}/>
          <Section genre={'Mystery'} videos={filterVideos(videos, 'mystery')}/>
          <Section genre={'Action'} videos={filterVideos(videos, 'action')}/>
          <Section genre={'Epic'} videos={filterVideos(videos, 'epic')}/>
          <Section genre={'Fantasy'} videos={filterVideos(videos, 'fantasy')}/>
          <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
          <Section genre={'Animation'} videos={filterVideos(videos, 'animation')}/>
          <Section genre={'Musical'} videos={filterVideos(videos, 'musical')}/>
          <Section genre={"Children's Film"} videos={filterVideos(videos, "children's film")}/>
      </div>
    </>
  )
}

export default Home