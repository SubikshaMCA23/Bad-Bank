import "./styles.css";

import image from "./FINAL.gif";

export default function Home() {
    return (
      
        <div className="home">
            <h1>WELCOME TO HDFC BANK</h1>
            
            <img src={image} alt="Bank image"  />
            
        </div>
    );
}
