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
                        <a href='/'>go back</a>
                        <button
                            className={'video-overlay'}
                            onClick={()=>{
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