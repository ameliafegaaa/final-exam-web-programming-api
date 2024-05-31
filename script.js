$(function () {
//ajax calls randomuser API to request 10 results that each includes their own name, picture, gender, location, phone, date of birth, nationality values.
    $("index.html").ready(function() {
        $.ajax({
            method: "GET",
            url: 'https://randomuser.me/api/?results=10&inc=name,picture,gender,location,phone,dob,nat,',
            dataType: "json",
        }).done(function (response) {
//if ajax is finished calling, will append the values into a unordered list with an id that is based on the array from the API.
            let seed = response.info.seed;
            let array = 0;
            while (array < 10){
                let img_list = $("<img>").attr({
                    "src": response.results[array].picture.large,
                    "width": 44,
                    "height": 44,
                });    
                $("#list").append('<li class="clickable" id="user' + array + '">').append(img_list).append("  " +response.results[array].name.first + " " + response.results[array].name.last + "</li>");
                array += 1;
            }
            $("#seed").text("Seed: " + seed)
//when an element (the user image or name text) is clicked, will trigger a function that checks the id of said element and hides all the elements that is being shown currently.
            $(".clickable").click(function() {
                let id_clicked = $(this).attr('id');
                let idnumber = id_clicked.replace("user","");
                $("#title, #list").hide();
//with the id that has just been checked, generating detailed values to be shown.
                let img_userpage = $("<img>").attr({
                    "src": response.results[idnumber].picture.large,
                    "width": 220,
                    "height": 220,
                });   
                $("#display").append(img_userpage).append("<p></p>" + response.results[idnumber].name.first + " " + response.results[idnumber].name.last + "<p></p>");
//generate tab table and go back button.
                let tab_system = `<div class="tab">
                <button class="tablinks" id="Private_Information">Private Information</button>
                <button class="tablinks" id="Location">Location</button>
                <ul id="list2"></ul>
                </div>
                <p><input type="button" value="Go to List" id="go_back"/></p>`
//declaring tab content to be shown depending on which is clicked.
                let Private_Information_content = '\n\n<li>Gender: ' + response.results[idnumber].gender + '</li><li>Nationality: ' + response.results[idnumber].nat + '</li><li>Phone: ' + response.results[idnumber].phone + '</li>'
                let Location_content = '\n<li>Street: ' + response.results[idnumber].location.street.name + " - " + response.results[idnumber].location.street.number + '</li><li>ZIP: ' + response.results[idnumber].location.postcode + '</li><li>City: ' + response.results[idnumber].location.city + '</li><li>State: ' + response.results[idnumber].location.state + '</li><li>Country: ' + response.results[idnumber].location.country + "</li>";
                $("#usercontent").append(tab_system);

                $("#Private_Information").click(function() {
                    $("#list2").empty();
                    $("#list2").append(Private_Information_content);
                })
                $("#Location").click(function() {
                    $("#list2").empty();
                    $("#list2").append(Location_content);
                })
//if go back button is clicked, it will delete all content on screen and show the content that was hidden previously containing the initial list.
                $("#go_back").click(function() {
                    $(".tab, #display, #usercontent").empty();
                    $("#title, #list").show();
                });
            });
        })
    })
});
