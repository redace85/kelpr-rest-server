const keplr_wallet = require('@keplr-wallet/cosmos');
const base64j = require('base64-js');
const express = require('express');

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 19999;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});

function build_res(code, msg, data) {  
   return {
      code,
      msg,
      data
   }
}  

app.post("/signdata", (request, response) => {
   const signDoc = keplr_wallet.makeADR36AminoSignDoc(
      request.body.signer, 
      request.body.data
   );
   const serializeSignDoc = base64j.fromByteArray(keplr_wallet.serializeSignDoc(signDoc));

   const data = {
      'base64ser': serializeSignDoc 
   }

   response.send(build_res(0, "", data));
});

