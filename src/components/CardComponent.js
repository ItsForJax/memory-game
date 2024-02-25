import './CardComponent.css'

export default function CardComponent({card}) {
    return (
        <div className='card'>
            <div>
              <img src={card.src} className='front' alt='front'/>
              <img src="/img/Cover.png" className='back' alt='back'/>
            </div>
        </div>
    )
}