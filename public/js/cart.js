window.onload = function(){
  
  var cart = shoppingCart; 
   

  cartInit();
  function cartInit(){
    
    var array = document.querySelectorAll(".product-details p span");
    array[0].innerText = cart.phone[1].color;
    array[1].innerText = cart.phone[2].capacity;
    array[2].innerText  = cart.phone[3].type;
    array[3].innerText  = cart.phone[3].carrier;
         
     
    
  }
  
}