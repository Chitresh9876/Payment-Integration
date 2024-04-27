import React from 'react'
import Ordercard from '../Order'
import { Stack } from '@mui/material'
import axios from "axios";


const orders = [
    {
        id: 1,
        name: "Laptop",
        amt: 1000,
        url: "https://m.media-amazon.com/images/I/71h7F81EBoS.jpg",
        desc: "This is a laptop categories",
    },
    {
        id: 2,
        name: "Computer",
        amt: 5000,
        url: "https://m.media-amazon.com/images/I/71snht4ZY+L._AC_UF1000,1000_QL80_DpWeblab_.jpg",
        desc: "This is a Computer categories",
    },
]

const Home = () => {

    const generateOrder = async (amt)=>{
        const { data: {key} } = await axios.get('http://localhost:4000/api/getkey');
        await axios.post('http://localhost:4000/api/checkout',{amt})
        .then((res)=>{
            const data = res?.data;
            console.log(data?.order);

            const options = {
                key: key,
                amount: `${amt*100}`,
                currency: "INR",
                name: "Chitresh Pvt. Ltd.",
                description: "You'r shoping form chitresh company",
                image: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1714089600&semt=sph",
                order_id: data?.order?.id,
                callback_url: "http://localhost:4000/api/paymentVarification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const rzp1 = new window.Razorpay(options);
                rzp1.open();

        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <>
    <Stack height={"100vh"} direction={{ xs: 'column', sm: 'row' }} spacing={3} useFlexGap flexWrap="wrap" alignItems={"center"} justifyContent={"center"}>
        {
            orders.map((order)=><Ordercard key={order.id} name={order.name} amt={order.amt} url={order.url} desc={order.desc} generateOrder={generateOrder}/>)
        }
      
    </Stack>
    </>
  )
}

export default Home
