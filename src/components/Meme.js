import React from 'react'
import { Heart } from 'react-spinners-css'

export default function Meme(props) {


    if(props.isLoading){
        return <div style={{
            width: 300,
            height:322,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}> <Heart /> </div>
    }
    
    if(!props.meme){
        return <div> I'm empty to being with</div>
    }
    const {meme, width, height} = props
    const {name,title, url} = meme

    const myStyle= {}


    if(width){
        myStyle.width = width
    }

    if(height){
        myStyle.height = height
    }

    function handleDelete(){
        if(props.deleteMeme){
            props.deleteMeme(meme.url)
        }
    }

    return (
        <div className="meme">
            {!props.noTitle && <div className="name">{name || title}</div>}
            <div onClick={handleDelete} className="image" style={myStyle}>
                <img src={url} alt="Meme" />
            </div>
        </div>
    )
}
