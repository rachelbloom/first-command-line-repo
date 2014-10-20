var microwaveApp ={};
// sets the apikey and apiid for the ajax request
microwaveApp.apikey = "b45cbb408918687c10ed01e95631319d";
microwaveApp.apiid = "fcf3be7c";


microwaveApp.init = function(){
	// prevents the page from reloading automatically
	$('#myForm').on('submit', function(e) {
		e.preventDefault();
		// sets the ingredient variable to be whatever is submitted through the form
		var ingredient = $('input.form').val();
		// console.log('init is running');
		// searches for recipes with microwave plus whatever ingredient is submitted by user
		microwaveApp.getRecipes("microwave+" + ingredient);
	});

};

microwaveApp.getRecipes = function(recipe){

	$.ajax({
		url: "http://api.yummly.com/v1/api/recipes",
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_key: microwaveApp.apikey,
			_app_id: microwaveApp.apiid,
			q: recipe,
			maxResult: 3,
			// start: 1,
		},
		success: function(result){
			$('main').empty();
			microwaveApp.displayRecipes(result);
		}
			

	});

};

microwaveApp.displayRecipes = function(data){
	var recipes = data.matches;
	var microwaveContainer = $('main');
	$.each(recipes, function (i, recipe){
		// console.log(recipe);
		// console.log(recipes[i].recipeName);
		// console.log(recipes[i].smallImageUrls);
		var imgSrc = recipe.smallImageUrls.toString().replace('=s90', ''); 
		var recipeImage = $('<img>').attr('src', imgSrc);
		var title = $('<h2>').text(recipe.recipeName);
		// var image = $('<img>').attr('src', recipe.smallImageUrls);
		var ingredients = $('<p>').text(recipe.ingredients);
		var url = $('<a>').attr({'href': 'http://yummly.com/recipe/' + recipe.id, 'target' : '_blank'});
		var clickable = url.append(title, recipeImage);
		// var id = $('<p>').text(recipe.id);
		// var recipeImageContainer = $('<div>').addClass('recipeImage').append(recipeImage)
		
		var yourRecipe = $('<div>').append(url, ingredients).addClass('jcontainer');

		microwaveContainer.append(yourRecipe);
		// var image = ('<img>').attr('src', i.smallImageUrls);
		// var rating = ('<p>').text(i.rating);
		// var yourRecipe = $('<div>').addClass('recipeChoice').append(title, image, rating);
		// microwaveApp.microwaveContainer.append(yourRecipe);	
	});
};





$(document).ready( function(){
		microwaveApp.init();
});
