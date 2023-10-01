'use client';
import axios from "axios";
import { Key, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import MiniProduct from '@/components/MiniProduct'
import Product from '@/components/Product'

export default function StorePage({ params }: { params: { storeid: Key } }) {

    const router = useRouter();
    const [store,setStore]:any = useState(null);
    const [productdetails,setProductdetails] = useState({storeid:params.storeid,name:'',description:'',price:0,imageurl:'',category:''})
  const [activeProduct,setActiveProduct] = useState(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // -------------------------------UPLOAD FUNCTIONS FOR CLOUDINARY----------------------------------------------

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setSelectedFile(file);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(selectedFile);
    };
  
    const UploadToCloudinary = async() =>{
      try {
          if (selectedFile?.type === 'image/png' || selectedFile?.type === 'image/jpeg' || selectedFile?.type === 'image/jpg'){
              
            const formdata = new FormData();
            formdata.append('file', selectedFile)
            formdata.append('upload_preset','cvrhackthon')
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/dvudkkxl4/image/upload",
              {
                method: "POST",
                body: formdata,
              }
            );
            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.url;
            return imageUrl
          }
          else{
              console.log('Please upload only images')
          }
      } catch (error) {
          console.log(error);
      }
  
    } 


    // ----------------------------------ADDING PRODUCT------------------------------------
  const AddProduct = async ()=>{
    try {
      const imageUrl = UploadToCloudinary();
      imageUrl.then((value:string)=>{
        productdetails.imageurl = value
      }).then( async ()=>{
        if (productdetails.name !='' || productdetails.price != 0 || productdetails.imageurl !='' || productdetails.storeid !=params.storeid || productdetails.category !=''){
        const response = await axios.post('/api/addproduct',productdetails)
        console.log('succesfuly added',response)
        }
        else{
          console.log('check all requirements')
        }
      }).then(()=>{
        location.reload()
      })
    } catch (error:any) {
      console.log('adding failed',error.message)
    }
  } 
    
    
    
    const GetStoreInfo = async()=>{
      try {
        await axios.post('/api/getstoreinfo',{storeid:params.storeid}).then((res)=>{
          setStore(res.data.data)
        })
      } catch (error) {
        console.log(error)
      }
    }

    const ActivateProduct = (id:any)=>{
      if (activeProduct == id){
          setActiveProduct(null)
      }else{
          setActiveProduct(id)
      }
  }

    useEffect(()=>{
      GetStoreInfo()
    },[])

    return (
      <>

      ------------------------STOREPAGE----------------------------------------
      <br />
      <div> {store !=null && <p>{store.storename}</p> }   </div>
      <br />

        -----------------PRODUCTSVIEW-----------------
        <br />
        {store !=null && 
          <>
            {store.products.length > 0 &&  
              <>
              {store.products.map((product:any)=>{
                return (
                  <div key={product._id} onClick={(e)=>{e.preventDefault();ActivateProduct(product._id)}} >
                    {activeProduct == product._id ? 
                    <>
                        <Product product={product} />
                    </>
                    :
                    <>
                        <MiniProduct product={product} />
                    </>
                    } 
                    </div>
                )
              })}
              </> 
            }
          </>
        }
        <br />
        -----------------PRODUCTSVIEW-----------------
        <br />

        -----------------ADDPRODUCTS-----------------
        <br />

        { store !=null && <> <p>Adding To {store.storename}</p>
        <input  value={productdetails.name} onChange={(e)=>setProductdetails({...productdetails,name:e.target.value})} placeholder='product name' type="text"/>
          <input  value={productdetails.description} onChange={(e)=>setProductdetails({...productdetails,description:e.target.value})} placeholder='product desc' type="text"/>
          <input  value={productdetails.price} onChange={(e)=>setProductdetails({...productdetails,price:Number(e.target.value)})} placeholder='product price' type="number"/>
          <input  value={productdetails.category} onChange={(e)=>setProductdetails({...productdetails,category:e.target.value})} placeholder='product category' type="text"/>
          <div className="App">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileInput} />
          </form>
        </div>
          <button onClick={(e)=>{e.preventDefault();AddProduct()}}>Add Product</button> </> }



        <br />
        -----------------ADDPRODUCTS-----------------
        <br />

      ------------------------STOREPAGE----------------------------------------

      </>

    )
  }