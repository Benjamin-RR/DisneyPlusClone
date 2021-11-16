import { gql, GraphQLClient} from 'graphql-request';

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

const Video = ({video}) => {
    console.log('video:', video);
    return(
        <div></div>
    )
}

export default Video