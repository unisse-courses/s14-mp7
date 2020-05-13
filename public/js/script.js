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
        var buttonDiv = document.createElement('div');
        
        var img = document.createElement('img');
        var villaHeading = document.createElement('h4');
        var desc = document.createElement('p');
        var priceHeading = document.createElement('h5');
        var reserveHeading = document.createElement('h5');       
        var button = document.createElement('button');
        var priceId = document.createElement('input');

        $(containerDiv).addClass("container py-3");
        $(cardDiv).addClass("card");
        $(rowDiv).addClass("row");
        $(imgCol).addClass("col-md-4");
        $(detailsCol).addClass("col-md-8 px-3");
        $(specificCol).addClass("card-block px-3");
        $(cardFooterDiv).addClass("card-footer bg-transparent");
        $(buttonDiv).addClass("centerReserveBtn");

        // for getting villa type and price

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
        }).text("Php " + item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

        $(button).attr({
            "class":"card-body reserveCard reserveNow",
            "type":"submit",
            "id": item._id
        });     
        $(reserveHeading).attr({
            "class":"card-title reserveText"
        }).text("Reserve Villa");
        
        button.append(reserveHeading);
        buttonDiv.append(button);
        cardFooterDiv.append(priceHeading);
        cardFooterDiv.append(buttonDiv);
        specificCol.append(villaHeading);
        specificCol.append(desc);
        specificCol.append(cardFooterDiv);
        detailsCol.append(specificCol);
        imgCol.append(img);

        rowDiv.append(imgCol);
        rowDiv.append(detailsCol);
        rowDiv.append(priceId);
        cardDiv.append(rowDiv);
        containerDiv.append(cardDiv); 
               
        villaList.append(containerDiv); 
    }
  
  
    function checkField(field, val) {
        var valid = val;

        if(field.val() == '') {
            valid = false;
            $("#warning").text("Fill-in missing information.");
        } else {
            $("#warning").text("");
        }

        return valid;
    }

    // #Search for Available Villas POST call
    $('#seeAvailable').click(function() {
        
        // check validity of form
        var valid = true;
        valid = checkField($("#checkIn"), valid);
        valid = checkField($("#checkOut"), valid);

        // Validating number of adults and children, total should not be greater than 8
        total = +$("#adultNum").val() + +$("#childNum").val();
        if(total > 8) {
            valid = false;
            $("#warning").text("Maximum capacity is 8.");
        }

        // Validating Date
        var val = valid;
        if (val === true){
            if ($("#checkIn").val() >= $("#checkOut").val()){
                valid = false;
                $("#warning").text("Please enter valid dates.");
            }
        }
        
        // if successful
        if(valid === true){
            var villageTheme = $('#villageTheme').val();
            var pax =  parseInt($('#adultNum').val()) + parseInt($('#childNum').val());
            var checkInDate = new Date($('#checkIn').val());
            var checkOutDate = new Date($('#checkOut').val());
            checkInDate.setHours(0);
            checkOutDate.setHours(0);
            $.post('/availabilities', { villageTheme: villageTheme, pax: pax, checkIn: checkInDate, checkOut: checkOutDate}, function(data, status) {
            
                //console.log(data);
                
                var villaList = $('#villaList');
                villaList.empty();
                
                if(data.length > 0){
                    try
                    {
                    //getting reservations to show list of availabilities
                    $.get('/reserveavailabilities').then(function(response) {
                        var reservationList = response;
                        console.log(reservationList);
                        
                            //show all available villas

                            var vipAvailable = 1;
                            var deluxeAvailable = 1;
                            var suiteAvailable = 1;
                            var premierAvailable = 1;

                            //loop through villas data array
                            for(var index = 0; index < data.length; index++) {
                                //loop through the reservations, checking for statuses, dates, capacity, villageTheme
                                for(var index1 = 0; index1 < reservationList.length; index1++){
                                    
                                    var cInDate = new Date(reservationList[index1].checkIn);
                                    var cOutDate = new Date(reservationList[index1].checkOut);
                                    var status = reservationList[index1].status;
                                    var vTheme = reservationList[index1].villa.villageTheme;
                                    var vType = reservationList[index1].villa.villatype;
                                    var villaListType = data[index].villatype;
                                    var vcapacity = data[index].capacity;
                                    
                                    if((status == "Active") && (cInDate.getTime() == checkInDate.getTime()) && (cOutDate.getTime() == checkOutDate.getTime()) && (vTheme == villageTheme) && (vType == villaListType) ){
                                    
                                        if(villaListType == "vip")
                                            vipAvailable = 0;

                                            else if(villaListType == "deluxe")
                                                deluxeAvailable = 0;

                                                else if(villaListType == "suite")
                                                    suiteAvailable = 0;

                                                    else if(villaListType == "premier")
                                                        premierAvailable = 0;
                                    }
                                
                                }   
                            }
                            
                            if(vipAvailable == 1  && pax <= 2){
            
                                element = data[data.findIndex(x => x.villatype === "vip")];
                                addVillaDiv(element, villaList);
                            }
                            if(deluxeAvailable == 1 && pax <= 4){
                                element = data[data.findIndex(x => x.villatype === "deluxe")];
                                addVillaDiv(element, villaList);
                            }
                            if(suiteAvailable == 1 && pax <= 6){
                                element = data[data.findIndex(x => x.villatype === "suite")];
                                addVillaDiv(element, villaList);
                            }
                            if(premierAvailable == 1 && (pax > 0) && (pax <= 8)){
                                element = data[data.findIndex(x => x.villatype === "premier")];
                                addVillaDiv(element, villaList);
                            }
                    });
                } catch(err){
                    console.log(err);
                }

                        // reserve a villa
                        $('.reserveNow').click(function() {
                                
                            // Get the data from the form
                            var reserveId = this.id;
                            var checkIn = $('#checkIn').val();
                            var checkOut = $('#checkOut').val();
                            var adultNum = $('#adultNum').val();
                            var childrenNum = $('#childNum').val();
                            var priceId = $('#priceId').val();
                            var status = "Active";
                        
                            var newReservation = {
                                checkIn: checkIn,
                                checkOut: checkOut,
                                adultNum: adultNum,
                                childrenNum: childrenNum,
                                villa: reserveId,
                                priceId: priceId,
                                status: status
                            };

                        //  console.log(newReservation);
                            
                            $.post('/reserve', newReservation).then(function(response) {
                                
                                if (response.success == true) {
                                    window.location.replace(response.url);
                                }
                            
                            }); 
                        }); 
            
                    }

                    else{
                        var show = document.createElement('p');
                        var containerDiv = document.createElement('div');
                        $(containerDiv).addClass("container py-3");
                        $(show).attr({
                            "class":"warningText",
                            "id": 'show'
                        }).text("No available villas on that date.");
                        containerDiv.append(show);
                        villaList.append(containerDiv);
                    }
            
                });
        } 
    });
  });
  