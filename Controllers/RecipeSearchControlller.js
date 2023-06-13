const recipeModel = require('../Models/RecipeModel');
const { getOrSetCache } = require('../Utils/GetOrSetCache')

exports.searchRecipeByName = async (req, res) => {
	try {
		const { name } = req.params;

		const recipes = await getOrSetCache(`recipename`, async () => {
			return await  recipeModel.aggregate([
			{
				$match: { recipeName: name }
			}
		]);
		}) 

		if (recipes.length === 0) {
			throw new Error(`there is no recipe by ${name} you can create your own `);
		}
		res.status(200).json({
			success: true,
			recipes,
			totalRecipes: recipes.length
		});
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByCategory = async (req, res) => {
	const { category } = req.params;
		const recipes = await getOrSetCache(`recipecategory`, async () => {
			return   await recipeModel.find({ category });

		}) 
		
	if (recipes.length === 0) {
		throw new Error(
			`there is no category by ${category} you can create your own `
		);
	}
	res.status(200).json({
		success: true,
		recipes,
		totalRecipes: recipes.length
	});
	try {
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByType = async (req, res) => {
	try {
		const { type } = req.params;
		const recipes = await getOrSetCache(`recipetype`, async () => {
			return   await recipeModel.find({ type });

		}) 
			

		if (recipes.length === 0) {
			throw new Error(`there is no recipe by ${type} you can create your own `);
		}

		res.status(200).json({
			success: true,
			recipes,
			totalRecipes: recipes.length
		});
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByArea = async (req, res) => {
	try {
		const { area } = req.params;
		const recipes = await  getOrSetCache(`recipearea`, async () => {
			return   await recipeModel.find({ area });

		}) 
			

		if (recipes.length === 0) {
			throw new Error(`there is no area by ${area} you can create your own `);
		}
		res.status(200).json({
			success: true,
			recipes,
			totalRecipes: recipes.length
		});
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByMainIngredient = async (req, res) => {
	try {
		const { mainIngredient } = req.params;

		const recipes =  await  getOrSetCache(`recipemainIngredient`, async () => {
			return await recipeModel.find({ mainIngredient });
		}) 
			
			
		if (recipes.length === 0) {
			throw new Error(
				`there is no mainIngredient by ${mainIngredient} you can create your own `
			);
		}
		res.status(200).json({
			success: true,
			recipes,
			totalRecipes: recipes.length
		});
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByIngredients = async (req, res) => {
	try {
		const { ingredient } = req.params;

		const recipes =  await  getOrSetCache(`recipeIngredient`, async () => {
			return await recipeModel
			.find({
				'ingredients.name': ingredient
			})
		}) 
			
			
		if (recipes.length === 0) {
			throw new Error(
				`there is no ingredient by ${ingredient} you can create your own `
			);
		}
		res.status(200).json({
			success: true,
			recipes,
			totalRecipes: recipes.length
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ sucess: false, message: error.message });
	}
};

exports.searchRecipeByUsersName = async (req, res) => {
	try {
	} catch (error) {
		res.status(400).json({ sucess: false, message: error.message });
	}
};

// List all Categories, Area, Ingredients

exports.getCategoriesList = async (req, res) => {
	try {
		const allCategories = await recipeModel.aggregate([
			{
				$group: {
					_id: null,
					categories: { $push: '$category' }
				}
			}
		]);

		res.status(200).json({
			success: true,
			allCategories
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error.message
		});
	}
};


