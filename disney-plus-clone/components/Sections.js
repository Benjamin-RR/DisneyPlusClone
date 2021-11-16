import Card from './Card';

// for seperating all videos into different genres
const Section = ({genre, videos}) => {
    return(
        <div className={'section'}>
            <h3>{genre}</h3>
            <div className='video-feed'>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail} />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Section