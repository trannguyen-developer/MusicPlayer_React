import React from 'react';
import classes from './ListMusic.module.scss'

const ListMusic = props => {

    const itemMusic = props.songs.map((child, index) => 
        <li className={classes['item-song']} key={index}>
            <div className={classes.img}>
                <div className={classes['img-song']} style={{backgroundImage:`url(${child.image})`}}>
                </div>
            </div>
            <div className={classes['info-song']}>
                <div className={classes.author}>
                {child.singer}
                </div>
                <div className={classes['name-song']}>
                {child.name}
                </div>
            </div>
            <div className={classes['info-more']}>
                <span className="material-icons">more_horiz</span>
            </div> 
        </li>
    )
    
    return(
        <ul className={classes['list-song']}>
            {itemMusic}
        </ul>
    )
}

export default ListMusic
