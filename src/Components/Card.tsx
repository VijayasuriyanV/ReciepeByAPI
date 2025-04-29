import { Recipe } from "../types/reciepetypes"
import "../styles/Card.css"
import { useNavigate } from "react-router-dom"


interface Props{
    data:Recipe[] | null,
    error:string| null
}
export default function Card({data,error}:Props) {
  const navigate=useNavigate()
  
    return (
    <div className="container">
       {error ? <p>{error}</p> : 
        <div className="card-wrapper">
        {data?.map((item)=>(
            <div className="card" key={item.id}>
                <img className="card-img" src={item.image}/>
                <br />

                <div className="card-details">
                    <h3>{item.name}</h3>
                    <p>{item.rating}</p>
                </div>

                <div className="card-info">
                    <p><i className="fa-solid fa-clock"></i>{item.cookTimeMinutes}</p>
                    <p>Servings: {item.servings}</p>
                    <p>{item.cuisine}</p>
                </div>

                <div className="card-footer">
                    <p>Review-count: {item.reviewCount}</p>
                    <button onClick={()=>navigate(`/recipe/${item.id}`)}>Full Recipe</button>
                </div>

            </div>
        ))}
    </div>
       }
    </div>
  )
}
