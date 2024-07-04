import redPanda from '../assets/red-panda.png'
import biscuitIMG from '../assets/sausainis.png'
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY_BISCUITS = 'biscuits'
const LOCAL_STORAGE_KEY_BPS = 'bps'

export default function Sections() {
   const [biscuits, setBiscuits] = useState(0)
   const [bps, setBps] = useState(0);
   const [purchasedManufacturers, setPurchasedManufacturers] = useState([])
   const [scaled, setScaled] = useState(false);

   //array of manufacturer objects
   const initialBiscuitManufacturers = [
      {name: "Panda's Fluffy Bakery", cost: 25, bps: 1},
      {name: "Red Panda Rumbly Bakes", cost: 100, bps: 10},
      {name: "Cheeky Panda Cookie Co.", cost: 1000, bps: 50},
      {name: "Red Panda Munchy Morsels", cost: 5000, bps: 200},
      {name: "Panda's Patisserie Palace", cost: 10000, bps: 1000},
      {name: "Red Panda's Cupcake Cuddle", cost: 20000, bps: 5000},
      {name: "Panda's Biscuit Bonanza", cost: 100000, bps: 20000},
      {name: "Red Panda's Nutty Nibbles", cost: 500000, bps: 100000},
      {name: "Panda's Biscuit Bliss", cost: 2000000, bps: 500000},
      {name: "Red Panda's Muffin Madness", cost: 10000000, bps: 2000000},
   ];

   //format the counter, manufacturers cost and Bps to be more readable for user.
   const formatNumber = (num) => {
      if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + ' billion';
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + ' million';
      } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + ' thousand';
      }
      return num.toString();
    };

  //I need a timer to track the biscuits value, keeping an eye on the biscuitsPerSecond value.
  //The biscuits value will go up by the value of biscuitsPerSecond
  //make the increments smooth by increasing frequency
  useEffect(() => {
   let lastUpdateTime = Date.now();
   let accumulatedBiscuits = 0;

   const updateBiscuits = () => {
     const currentTime = Date.now();
     const deltaTime = (currentTime - lastUpdateTime) / 1000;
     lastUpdateTime = currentTime;
     accumulatedBiscuits += bps * deltaTime; 

     if (accumulatedBiscuits >= 1) {
       const wholeBiscuits = Math.floor(accumulatedBiscuits);
       setBiscuits((prevBiscuits) => prevBiscuits + wholeBiscuits);
       accumulatedBiscuits -= wholeBiscuits; 
     }
   };

   const interval = setInterval(updateBiscuits, 30); 

   return () => clearInterval(interval);
   }, [bps]);

   //handles onclick of the biscuit, when clicked adds +1 to the counter.
   const addToBiscuits = () => {
         setBiscuits(biscuits + 1)
         setScaled(true);
         setTimeout(() => {
            setScaled(false);
         }, 50)
      }

      //update the manufacturer cost with every purchase, useState to track it.
      const [biscuitManufacturers, setBiscuitManufacturers] = useState(initialBiscuitManufacturers);

      const buyManufacturer = (index) => {
         const selectedManufacturer = biscuitManufacturers[index];
         if (biscuits >= selectedManufacturer.cost) {
           setBiscuits(biscuits - selectedManufacturer.cost);
           setBps(bps + selectedManufacturer.bps);
           setPurchasedManufacturers([...purchasedManufacturers, selectedManufacturer.name]);
           //increase the consecutive cost of each manufacturer
           const newCost = selectedManufacturer.cost * 1.3;
           
           // Update the state of biscuitManufacturers with the new cost
           const updatedManufacturers = [...biscuitManufacturers];
           updatedManufacturers[index] = { ...selectedManufacturer, cost: newCost };
           setBiscuitManufacturers(updatedManufacturers);
         }
       };

       //retrieve local storage
   useEffect(() => {
      const storedBiscuits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_BISCUITS))
      if (storedBiscuits) setBiscuits(storedBiscuits)

      const storedBps = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_BPS))
      if (storedBps) setBps(storedBps)
   }, [])  

   
   //add to local storage
   useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY_BISCUITS, JSON.stringify(biscuits))
   });
   // add bps to local storage
   useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY_BPS, JSON.stringify(bps))
   })


  return (
    <div className="sections-container">
         <section>
            <h1>Total Biscuits</h1>
            <div className='counter-section'>
              <h2 className='counter-span'>Biscuits : {formatNumber(Math.floor(biscuits))}</h2>
              <h2>BPS : {formatNumber(Math.floor(bps))}</h2>
              <img onClick={addToBiscuits} className={`my-biscuit-button ${scaled ? 'scaled' : ''}`} src={biscuitIMG} alt='The picture of the biscuit'/>
            </div>
         </section>

         <section className='the-shop-section'>
            <h1>Purchase Manufacturers</h1>
            {biscuitManufacturers.map((manufacturer, index) => (
              <div key={index} className={`manufacturers ${biscuits >= manufacturer.cost ? 'shown-pandas' : 'hidden-pandas'}`}>
                <img className='red-pandas' src={redPanda} alt="Red Panda eating a biscuit" />
                <div>{manufacturer.name}</div>
                <div>Cost: {formatNumber(Math.floor(manufacturer.cost))} biscuits</div>
                <div>BPS increase: {manufacturer.bps}</div>
                <button onClick={() => buyManufacturer(index)}>Buy me</button>
              </div>
            ))}
         </section>
    </div>
  )
}
