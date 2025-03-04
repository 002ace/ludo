import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export  const   userDetails =   createAsyncThunk('userDetails' , async(userData , {rejectWithValue })=>{

       try
       {   
           const response = await axios.post("http://localhost:8080/api/signup", userData , {withCredentials:true});
           return response.data;

       }
       catch(error){
           return rejectWithValue(error.response?.data || "Something went wrong");
       }



})                 


export  const  loginUser  =  createAsyncThunk('loginUser' , async(userData ,  {rejectWithValue })=>{

    try
    {  
        console.log(userData , "this is  login user")
        const response = await axios.post("http://localhost:8080/api/login",userData,{withCredentials:true});
        return response.data;

    }
    catch(error){
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})


export const  sendotp = createAsyncThunk('sendotp' , async(userData ,  {rejectWithValue})=>{
    try{
          const response =  await  axios.post("http://localhost:8080/api/sendotp" ,userData , {withCredentials:true} )
          return response.data;
    }
    catch(error)
    {      return rejectWithValue(error.response?.data || "Something went wrong");

    }
})



export const getUser  =  createAsyncThunk('getUser' , async(_ , {rejectWithValue})=>{
  
       try
       {    
             const response =  await  axios.get("http://localhost:8080/api/getbyid" , {withCredentials:true} )
             return response.data;

       }
       catch(error)
       {
             return rejectWithValue(error.response?.data || "Something went wrong");
       }
     

}) 


export const  gamedetails = createAsyncThunk('gamedetails' , async(_ ,{rejectWithValue})=>{
       
      try
      {  
             const response =  await  axios.get("http://localhost:8080/api/gamedetails" ,{withCredentials:true})
             return response.data; 
      }
      catch(error)
      {
             return rejectWithValue(error.response?.data || "Something went wrong");  
      }

})



const  userslice =  createSlice({
      name:"user",
      initialState:{
          user : null ,
          game:null,
          loading:false  ,
          error:null ,
          otp : null ,

      },
      reducers:{
         addUser : (state , action) =>{
               
         },
         removeUser : (state ,  action) =>{

         },
         clearError: (state) => {
            state.error = null;
          },

      },

      extraReducers:(builder)=>{
        
        builder

         .addCase(userDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(userDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(userDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

           //loginuser
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          //sendotp
          
         .addCase(sendotp.pending , (state)=>{
            state.loading = true;
            state.error = null;
          })

          .addCase(sendotp.fulfilled, (state, action) => {
            state.loading = false;
            state.otp = action.payload;
          })

          .addCase(sendotp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })


          //->getuser
          
          .addCase(getUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })


          //getDetails

          .addCase(gamedetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(gamedetails.fulfilled, (state, action) => {
            state.loading = false;
            state.game = action.payload;
          })
          .addCase(gamedetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })





      }
})

export const{addUser , removeUser , clearError } =  userslice.actions;

export default userslice.reducer;