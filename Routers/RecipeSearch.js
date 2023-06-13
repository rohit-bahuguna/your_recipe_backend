const express = require('express');

const {
	searchRecipeByName,
	searchRecipeByArea,
	searchRecipeByCategory,
	searchRecipeByIngredients,
	searchRecipeByMainIngredient,
	searchRecipeByType,
	searchRecipeByUsersName,
	getCategoriesList
} = require('../Controllers/RecipeSearchControlller');

const searchRouter = express.Router();

const { isUserLoggedIn } = require('../Middlewares/auth');

searchRouter.route('/name/:name').get(isUserLoggedIn, searchRecipeByName);

searchRouter.route('/area/:area').get(isUserLoggedIn, searchRecipeByArea);

searchRouter
	.route('/category/:category')
	.get(isUserLoggedIn, searchRecipeByCategory);

searchRouter
	.route('/mainingredient/:mainIngredient')
	.get(isUserLoggedIn, searchRecipeByMainIngredient);

searchRouter.route('/type/:type').get(isUserLoggedIn, searchRecipeByType);

searchRouter
	.route('/usersname/:name')
	.get(isUserLoggedIn, searchRecipeByUsersName);

searchRouter
	.route('/ingredients/:ingredient')
	.get(isUserLoggedIn, searchRecipeByIngredients);

searchRouter.route('/getcategorylist').get(isUserLoggedIn, getCategoriesList);

module.exports = searchRouter;
