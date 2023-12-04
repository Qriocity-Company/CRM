import axios from 'axios';
import React , {useState} from 'react'

const Home = () => {
  const [File, setFile] = useState(null)


   const onSubmitHandler  = (e)=>{
     e.preventDefault();

     let formData = new FormData();
     formData.append("file" , File);

     axios.post("http://localhost:5000/upload" , formData).then((res)=>{console.log(res)}).catch(err=>console.log(err));

   }

  return (
    <>
      <form onSubmit={onSubmitHandler}>

        <input type="file" accept='image/*' onChange={(e)=>{setFile(e.target.files[0])}} />
        <button className='btn bg-blue-400' type='submit' >upload</button>
      </form>
    </>
  )
}

export default Home
