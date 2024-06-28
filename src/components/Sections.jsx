import myBiscuit from  '../assets/sausainis.png'
import redPanda from '../assets/red-panda.png'

export default function Sections() {
  return (
    <div className="sections-container">
         <section>
            <h1>Your Biscuit Production</h1>
         </section>
         <section>
            <h1>Total Biscuits</h1>
            <div className='counter'> 0 </div>
            <h2>Biscuits Per Second</h2>
            <img className='my-biscuit-button' src={myBiscuit} alt="Biscuit called Gaidelis" />
         </section>
         <section>
            <h1>Purchase Manufacturers</h1>
            <img src={redPanda} alt="Red Panda eating a biscuit" />

         </section>
    
    </div>
  )
}
