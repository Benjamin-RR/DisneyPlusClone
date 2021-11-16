// used for displaying thumbnail image/s for our sections.
const Card = ({thumbnail}) => {
    return <img className='card' src={thumbnail.url} alt={thumbnail.title} />
}

export default Card