import React from "react";

// Componente
const ItemContainer = ({image, chance, name, quantity}) => {
    return (
        <>
            <div className="item-frame">
                <span>{name}</span>

                <div className="out-frame">
                    <div className="in-frame">
                        <img src={`${image}`} alt="" width={30} />
                    </div>
                </div>
                <div className="prob-bar">
                    <div className="prob" style={{width: `${chance}%`, backgroundColor: 'blue', borderRadius: '1rem'}} />
                </div>
                <span className="bar-name">Qtde</span>
                <span className="qty">{quantity}</span>
            </div>
        </>
    );
}

export default ItemContainer;