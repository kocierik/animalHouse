//!!! STA ROBA E' SOLO TEST, NON VA TENUTA !!!
      
        var imgString = "";         //stringa usata per immagazzinare l'immagine da inviare; TODO: implementare salvataggio immagine su server e usare path sul DB
      //TEMPLATE ITEM DA MOSTRARE
      const Item = ({ img, name, price, id, displaySize }) => `
        <div class="col${displaySize} item">
          <input type="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/2048px-Red_x.svg.png" class="item-remove" onclick=itemRemove("${id}")>
          <img class="item-image" src="${img}">
          <span class="item-title">${name}</span>
          <span class="item-price">${price}$</span><br><br>
        </div>
      `;
      
      // TEST PRODUCT GET
      $( "#productGetButton" ).click(function() {
        retrieveProduct('#productGetItems',$('#productGetInput').val());
      });


      // TEST PRODUCT POST
      $( "#productPostSend" ).click(function() {
        var headers = {
          "Content-Type": "application/json",                                                                                                
          "Access-Control-Origin": "*"
        }
        var data = {
          "name": $("#productPostName").val(),
          "price": $("#productPostPrice").val(),
          "categoryId": "62f3c0540ac73a2bc4764da8",
          "description": $("#productPostDescription").val(),
          "animalTargets": [],
          "image": imgString
        };
        //console.log(data);
        fetch("/v1/market/products", {
          method: "POST",
          headers: headers,
          body:  JSON.stringify(data)
        }).then((response)=>response.json()).then(data=>{
          console.log(data);
          $("#productPostResult").html("<h3>Here is the product you added</h3>");
          $("#productPostResult").append([{displaySize: '-md-12',img: data.image, name: data.name, price: data.price, id: data._id}].map(Item));
          retrieveProduct('#productDeleteItems',"");
        }).catch(function(){
          alert("ERRORE");
        });
      });
      


      //TEST PRODUCT DELETE
      function itemRemove(id){
        if (confirm('Are you sure you want to remove the product '+id+'?')) {
          $.ajax({
            url: "/v1/market/products/"+id,
            type: 'DELETE',
            success: function(result) {
              //alert(result);
              retrieveProduct('#productDeleteItems',"");
            }
          });
        }        
      }

      $(document).ready(function(){
        retrieveProduct('#productDeleteItems',"");
      });

      function retrieveProduct(target,id){ //leave id blank to retrieve all products
        var url = "/v1/market/products/"+id;
        fetch(url).then((response)=>response.json()).then((data)=>{
          $(target).text("");
          
          data.forEach(function(el){
            $(target).append([{displaySize: '-md-3',img: el.image, name: el.name, price: el.price, id: el._id}].map(Item));
          });
        });
      }

      $("#productPostImage").change(function(){
        encodeImageFileAsURL(this);
      });
      function encodeImageFileAsURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            var reader = new FileReader();
            reader.onloadend = function() {
                //console.log(String(reader.result));
                imgString = String(reader.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
      }