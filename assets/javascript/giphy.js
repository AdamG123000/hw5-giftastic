

//we must fill Noah's Ark with animals before the flood arrives
//must create buttons for each animal added(array perhaps)

$(document).ready(function(){

    let animals = ["sharks", "bears", "lions", "tigers", "whales", "rats"];

    //create a function that adds buttons for each animal that will be added

    function addAnimal(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (let i=0; i < arrayToUse.length; i++){
            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    //create a the function that will pull from Giphy API and place gif in created element

    $(document).on("click", ".animal-button", function(){
        $("#images").empty();
        
        $(".animal-button").removeClass("active");
        $(this).addClass("active");

        let animal = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=f6nyY7aGYsV2XPGZuw18VZ1J4wUVrqV2&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          })

         .then(function(response){
            let results = response.data;

            for (var i = 0; i < results.length; i++){
                let animalDiv = $("<div class=\"animal-item\">");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;
                
                let animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#images").append(animalDiv);
            }

         }); 

    });

    //Set the state from still to animated when clicking individual images

    $(document).on("click", ".animal-image", function(){
        let state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-animal").on("click", function(event){
        event.preventDefault();
        let newAnimal = $("input").eq(0).val();

        if(newAnimal.length > 2) {
            animals.push(newAnimal);
        }

        addAnimal(animals, "animal-button", "#animal-buttons");
    });
    addAnimal(animals, "animal-button", "#animal-buttons");

})
