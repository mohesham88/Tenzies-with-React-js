

export default function (props){

    const held = {
        cursor: "auto",
        scale : "0.85",
        transition : "1s ease",
        opacity : "0.5",
    }


    return (
    
        <img 
            src = {props.source} className="dice"
            onClick={(event)=> props.handleClick(props.index)}
            style= {props.isHeld ? held : {}}
        />




    )
}