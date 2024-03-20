
import { createSlice } from '@reduxjs/toolkit'




let val = 'porp'
export const CartSlice = createSlice({
  
  name: 'cart0',
  
  initialState: {
    user:{
    value: 0,
    username: 0,
    Id: 4,
    
  },
  LoginUserData :{},
  facebookLoginUserData : {},
  googleLoginUserData: {},
  cart: [],
  counter:1,
  total: 0,
  id:0,
  MarketCart:[],
  MarketValue: 0,
  MarketTotal:0,
  acces_token :'',
  date: '',
  list: []
  
},

  reducers: {

userBioData: (state = 0,action) =>{

let data = action.payload
state.LoginUserData = data


//console.log(state.LoginUserData)
},

  addtoCart: (state = 0,action) => {
      
      let newItem = action.payload
      var totalF = parseFloat(state.total)



    var _condition = true;

    state.cart.forEach(obj => {
      
      Object.entries(obj).forEach(([key, value]) => {
        
        if( key === 'id' ){
          
          if( value === action.payload.id ){
            _condition = false;
          }

        }

      });
      
    });

    if(_condition == true){

      action.payload["quantity"] = 1

      state.cart.push(action.payload)
  
      state.total = parseFloat(action.payload.price) + totalF;
    
    }
      state.user.value = state.cart.length;
       console.log('Total: $' + state.total)
  
    },
    addList:(state=0,action) => {
state.list = action.payload
    },
    addDogMarket: (state = 0,action) => {
      
      let newItem = action.payload
      var totalF = parseFloat(state.MarketTotal)



    var _condition = true;

    state.MarketCart.forEach(obj => {
      
      Object.entries(obj).forEach(([key, value]) => {
        
        if( key === 'id' ){
          
          if( value === action.payload.id ){
            _condition = false;
          }

        }

      });
      
    });

    if(_condition == true){

      action.payload["quantity"] = 1

      state.MarketCart.push(action.payload)
  
      state.MarketTotal = parseFloat(action.payload.price) + totalF;
    
    }
      state.MarketValue = state.MarketCart.length;
       console.log('Total: $' + state.MarketTotal)
  
    },
    getDate: (state = 0, action) => {
state.getDate = action.payload

    },
    store_access_token: (state = 0,action) => {
state.acces_token = action.payload

    },
    removefromCart: (state,) => {
      
      state.user.value -= 1

    },
    faceBookLoginData: (state = 0 ,action) => {

const result = action.payload
state.facebookLoginUserData = result
      // console.log(state.facebookLoginUserData)

    },
    googleSignData: (state= 0, action) => {

const result = action.payload
state.googleLoginUserData = result


    },

    checkoutCounterAdd: (state,action) => {
      const numberOfItems = action.payload
state.counter+=1;
    },

    checkoutCounterSub: (state,action) => {
       const numberOfItems = action.payload
      state.counter-=1
    },
   






    increamentCounter: (state,action)=> {

   
   var _condition = true;
   
console.log("Item Clicked")

// action.payload.quantity++
// console.log(action.payload)
state.cart[action.payload].quantity++
// state.cart.forEach(item => {

// if(item)
// })
  
   // if(key==='quantity' && _condition===false){

      // value++
      // console.log(value)
      // }
      
      

    },
    decreamentCounter: (state,action)=>{
      state.cart[action.payload].quantity--
    },


    MarketIncreamentCounter: (state,action)=> {

   
      var _condition = true;
      
   console.log("Item Clicked")
   
   // action.payload.quantity++
   // console.log(action.payload)
   state.MarketCart[action.payload].quantity++
   // state.cart.forEach(item => {
   
   // if(item)
   // })
     
      // if(key==='quantity' && _condition===false){
   
         // value++
         // console.log(value)
         // }
         
         
   
       },
       MarketDecreamentCounter: (state,action)=>{
         state.MarketCart[action.payload].quantity--
       },
  


    
      
 
  }


})

// Action creators are generated for each case reducer function
export const { addtoCart,removefromCart,addList,getDate,MarketIncreamentCounter,MarketDecreamentCounter,addDogMarket,store_access_token,googleSignData,checkoutCounterAdd,faceBookLoginData,checkoutCounterSub,increamentCounter,decreamentCounter,userBioData} = CartSlice.actions
export default CartSlice.reducer

