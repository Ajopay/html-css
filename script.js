
       
 document.addEventListener("DOMContentLoaded", function() {
       
       const firstName = localStorage.getItem("firstName");
       console.log(firstName);
   
       
       if (!firstName) {
           window.location.href = "user.html";
       }
   
   
      
       fetch(`http://localhost:8080/${firstName}`)
           .then(response => response.json())
           .then(data => {
             
               document.querySelectorAll("#firstName").forEach(el => {
                   el.textContent = data.firstName;
               });
   
               // Update the account number
               document.querySelectorAll("#accountNumber").forEach(el =>{
                   el.textContent = data.accountNumber;
               });
            
               document.getElementById("availableBalance").textContent = data.availableBalance;
               document.getElementById("totalBalance").textContent = data.totalBalance;
              
   
               localStorage.setItem("userAccountNumber",data.accountNumber)
           })
          
           .catch(error => console.error("Error loading dashboard:", error));
   });
   
   
   document.getElementById('payment-link').addEventListener('click', function(event) {
      
       event.preventDefault();
   
      
       location.reload();
       
       
       window.location.href = "dash.html";
   });
   

   const transfer_modal = document.getElementById('transfer_modal')
   const fund_modal = document.getElementById('fund_modal')
   const request_modal = document.getElementById('request_modal')
   const save_modal=document.getElementById('save_modal')
   function openTransferModal() {
    transfer_modal.style.display = "flex";
}

function closeTransferModal() {
    transfer_modal.style.display = "none";
}

function openFundModal() {
    fund_modal.style.display = "flex";
}

function closeFundModal() {
    fund_modal.style.display = "none";
}

function openRequestModal() {
    request_modal.style.display = "flex";
}

function closeRequestModal() {
    request_modal.style.display = "none";
}
function openSavings(){
    save_modal .style.display = "flex";
    requestModal.style.display = "none"; 
  
}
function closeSavings() {
    save_modal.style.display = "none";
}

function backToRequestModal() {
    save_modal.style.display = "none"; 
    requestModal.style.display = "flex";
    }
   
   
    // OTP Inputs Logic
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            if (input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
   
    // PIN Inputs Logic
    const pinInputs = document.querySelectorAll('.pin-input');
    pinInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
            if (input.value.length === 0 && index > 0) {
                pinInputs[index - 1].focus();
            }
        });
    });
   
   
   
   
   
   
       document.getElementById("transfer-form").addEventListener("submit",function(event){
           event.preventDefault(); 
   
           const senderAccount=localStorage.getItem("userAccountNumber").value;
           if(!senderAccount){
               alert("Error:Account number not found,Please try again later");
               return;
           }
           const receiverAccount= document.getElementById("account-number").value;
           const amount= document.getElementById("amount").value;
           const note= document.getElementById("note").value;
           const pin= document.getElementById("pin1").value + document.getElementById("pin2").value+
                       document.getElementById("pin3").value + document.getElementById("pin4").value;
   
   
                       fetch("http://localhost:8080/transfer",{
                           method:"POST",
                           headers:{
                               "Content-Type":"application/json"
                           },
                           body:JSON.stringify({
                               senderAccount:senderAccount,
                               receiverAccount:receiverAccount,
                               amount:parseFloat(amount),
                               note:note,
                               pin:pin
                           })
                       })
                       .then(response=> response.json())
                       .then(data=>{
                       })
                       .catch(error => console.error("Error: ", error));
                       window.location.href="dash.html";
   
   
       });
   
   
   
    
   
