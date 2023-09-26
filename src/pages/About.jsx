import { StoresMap } from "../cmps/StoresMap";
// import SimpleMapPage from "../cmps/testMap";

export function About() {
    return (
        <section className="about">
            <h2>The Online Toy Shop</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, id eos consequuntur dolorum voluptates fuga laborum magni odit. Architecto facilis corrupti sunt similique quas, deleniti officia ducimus! Pariatur, voluptatibus harum!</p>
            <h3>Our stores</h3>
            <StoresMap />
            <img src='https://theonlinetoyshop.co.uk/cdn/shop/files/Copy_of_Red_blue_illustration_Kids_Toys_logo_NO_BACKGROUNF.png?v=1667935317' />
        </section>
    )
}