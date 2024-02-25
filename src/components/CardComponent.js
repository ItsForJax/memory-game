import './CardComponent.css'

export default function CardComponent({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled && !flipped) {handleChoice(card)}
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
              <img  src={card.src} 
                    className='front' 
                    alt='front' 
                    draggable="false"/>
              <img  src="/img/Cover.png" 
                    className='back' 
                    onClick={handleClick}
                    alt='back'
                    draggable="false"/>
            </div>
        </div>
    )
}