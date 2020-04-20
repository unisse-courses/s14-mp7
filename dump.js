$(document).ready(function() {
    // Adds the villas to the villaList
    function addVillaDiv(item, villaList) {
        var containerDiv = document.createElement('div');
        var cardDiv = document.createElement('div');
        var rowDiv = document.createElement('div');
        var imgCol = document.createElement('div');
        var detailsCol = document.createElement('div');
        var specificCol = document.createElement('div');
        var cardFooterDiv = document.createElement('div');
      //  var buttonDiv = document.createElement('div');
        
        var img = document.createElement('img');
        var villaHeading = document.createElement('h4');
        var desc = document.createElement('p');
        var priceHeading = document.createElement('h5');
       // var reserveHeading = document.createElement('h5');       
       // var button = document.createElement('button');
        var villaId = document.createElement('input');
        var priceId = document.createElement('input');

        $(containerDiv).addClass("container py-3");
        $(cardDiv).addClass("card");
        $(rowDiv).addClass("row");
        $(imgCol).addClass("col-md-4");
        $(detailsCol).addClass("col-md-8 px-3");
        $(specificCol).addClass("card-block px-3");
        $(cardFooterDiv).addClass("card-footer bg-transparent");
       // $(buttonDiv).addClass("centerReserveBtn");

        // for getting villa type and price
        $(villaId).attr({
            "value": item._id, 
            "type": "hidden",
            "id":"villaId"
        });
        $(priceId).attr({
            "value": item.price, 
            "type": "hidden",
            "id":"priceId"
        });

        $(img).attr({
            "src": item.imagePath, 
            "class":"w-100 mx-3 my-3"
        });

        $(villaHeading).attr({
            "class":"card-title my-2"
        }).text(item.villageTheme.toUpperCase() + " VILLA " + item.villatype.toUpperCase());
        $(desc).attr({
            "class":"card-text md-left ml-2 pl-5"
        }).text(item.shortDesc);

        $(priceHeading).attr({
            "class":"text-muted"
        }).text("Php " + item.price);
/*
        $(button).attr({
            "class":"card-body reserveCard reserveNow",
            "type":"submit"
        });     
        $(reserveHeading).attr({
            "class":"card-title reserveText"
        }).text("Reserve Villa"); */ 
        
       // button.append(reserveHeading);
       // buttonDiv.append(reserveHeading);
        cardFooterDiv.append(priceHeading);
       // cardFooterDiv.append(buttonDiv);
        specificCol.append(villaHeading);
        specificCol.append(desc);
        specificCol.append(cardFooterDiv);
        detailsCol.append(specificCol);
        imgCol.append(img);

        rowDiv.append(imgCol);
        rowDiv.append(detailsCol);
        rowDiv.append(villaId);
        rowDiv.append(priceId);
        cardDiv.append(rowDiv);
        containerDiv.append(cardDiv); 
               
        villaList.append(containerDiv); 
    }
  
  
    // POST called
    
  
    // #Search for Available Villas POST call
    $('#seeAvailable').click(function() {
      var villageTheme = $('#villageTheme').val();
      
      $.post('/availabilities', { villageTheme: villageTheme }, function(data, status) {
        
        console.log(data);
        
        var villaList = $('#villaList');
        villaList.empty();
        
        if(data.length > 0){
            data.forEach((item, i) => {
                addVillaDiv(item, villaList);
              });
            
            var cardGroup = document.createElement('div');
            var cardReserve = document.createElement('div');
            var bodyReserve = document.createElement('div');
            var reserveHeading = document.createElement('h5');
            var buttonDiv = document.createElement('div');
            var button = document.createElement('button');
            var villaTypes = document.createElement('h5');
            var select = document.createElement('select');
            var vipOption = document.createElement('option');
            var deluxeOption = document.createElement('option');
            var suiteOption = document.createElement('option');
            var premierOption = document.createElement('option');
            $(buttonDiv).addClass("card reserveLink centerReserveBtn ");
            $(cardReserve).addClass("card cardCustom2");
            $(bodyReserve).addClass("card-body reserveForm");
            $(cardGroup).addClass("card-group");

            $(button).attr({
                "class":"card-body reserveCard",
                "type":"button",
                "id": "reserveNow"
            });
            $(reserveHeading).attr({
                "class":"card-title reserveText"
            }).text("Reserve Villa");

            $(villaTypes).attr({
                "class":"card-title"
            }).text("Villa");
            $(select).attr({
                "id": "villatype", 
                "class":"custom-select formBG"
            });
            $(vipOption).attr({
                "value":"vip"
            }).text("VIP");
            $(deluxeOption).attr({
                "value":"deluxe"
            }).text("DELUXE");
            $(suiteOption).attr({
                "value":"suite"
            }).text("SUITE");
            $(premierOption).attr({
                "value":"premier"
            }).text("PREMIER");

            select.append(vipOption);
            select.append(deluxeOption);
            select.append(suiteOption);
            select.append(premierOption);
            bodyReserve.append(villaTypes);
            bodyReserve.append(select);
            cardReserve.append(bodyReserve);
            cardGroup.append(cardReserve);
            button.append(reserveHeading);
            buttonDiv.append(button);
            cardGroup.append(buttonDiv);
            villaList.append(cardGroup);


            $('#reserveNow').click(function() {
                console.log("in reserve");
              // Get the data from the form
              var checkIn = $('#checkIn').val();
              var checkOut = $('#checkOut').val();
              var adultNum = $('#adultNum').val();
              var childrenNum = $('#childNum').val();
              var villaId = $('#villaId').val();
              var priceId = $('#priceId').val();
              var status = "Active";
              var account = req.session.Account;
              
              var totalNights =  parseInt((checkOut-checkIn) / (24 * 3600 * 1000));
              var total = totalNights*priceId;
              var newReservation = {
                account: account,
                checkIn: checkIn,
                checkOut: checkOut,
                adultNum: adultNum,
                childrenNum: childrenNum,
                villa: villaId,
                total: total,
                status: status,
              };
          
              console.log(newReservation);
              /*
              $.post('students/add', newStudent, function(data, status) {
                console.log(data);
          
                if (data.success) {
                  $('#msg').text(data.message);
                  $('#msg').removeClass('fail');
                  $('#msg').addClass('success');
          
                  $('#name').val('');
                  $('#idnum').val('');
                  $("input[name='gender']:checked").prop("checked", false);
                } else {
                  $('#msg').text(data.message);
                  $('#msg').removeClass('success');
                  $('#msg').addClass('fail');
                }
          
              }); */
            }); 
        }

        else{
            var show = document.createElement('p');
            $(show).text("No available villas on that date.");
            villaList.append(show);
        }
        console.log("out reserve");
      });
    });
  });
