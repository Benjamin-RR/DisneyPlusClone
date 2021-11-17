import { gql, GraphQLClient} from 'graphql-request';
import {useState} from 'react';

export const getServerSideProps = async (pageContext) => {
    const url = `${process.env.REACT_APP_GRAPHCMS_URL}`;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization" : `Bearer ${process.env.REACT_APP_GRAPHCMS_APIKEY}`
        }
    })
    const pageSlug = pageContext.query.slug;
    // console.log('pageSlug:', pageSlug);

    const query = gql`
        query($pageSlug: String!) {
            video(where: {
                slug: $pageSlug
            }) {
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

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables);
    const video = data.video;

    return {
        props: {
            video
        }
    }
}

// this function will change a video to seen for the current signed on user.
const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug })
    })
}

// for display info of video to be watched, and actual video including controls.
const Video = ({video}) => {
    const [watching, setWatching] = useState(false);
    return(
        <>
            {!watching && (
                <>
                    <img className='video-image' src={video.thumbnail.url} alt={video.title} />
                    <div className='info'>
                        <p>{video.tags.join(', ')}</p>
                        <p>{video.description}</p>
                        <button className='button'>
                            <a href='/'>go back</a>
                        </button>
                        
                        <button
                            className={'video-overlay'}
                            onClick={()=>{
                                changeToSeen(video.slug);
                                watching ? setWatching(false) : setWatching(true);
                            }}
                        >PLAY</button>
                    </div>
                </>
            )}
            { watching && (
                <video width='100%' controls>
                    <source src={video.mp4.url} type='video/mp4' />
                </video>
            )}
            <div className={'info-footer'}
                onClick={()=> watching ? setWatching(false) : null}
            ></div>
        </>
    )
}

export default Video