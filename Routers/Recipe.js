const express = require('express');
const {
	createRecipe,
	uploadMedia,
	likePost,
	getAllRecipe,
	getAllRecipeOfAuser,
	deleteRecipe,
	editRecipe
} = require('../Controllers/RecipeController');
const { isUserLoggedIn } = require('../Middlewares/auth');
const recipeRouter = express.Router();

recipeRouter.route('/createrecipe').post(isUserLoggedIn, createRecipe);

recipeRouter.route('/editrecipe/:recipeId').put(isUserLoggedIn, editRecipe);

recipeRouter
	.route('/deleterecipe/:recipeId')
	.delete(isUserLoggedIn, deleteRecipe);

recipeRouter.route('/uploadmedia').post(isUserLoggedIn, uploadMedia);

recipeRouter.route('/likerecipe/:recipeId').put(isUserLoggedIn, likePost);

recipeRouter.route('/getallrecipes').get(getAllRecipe);

recipeRouter
	.route('/getallrecipeofuser')
	.get(isUserLoggedIn, getAllRecipeOfAuser);

module.exports = recipeRouter;
