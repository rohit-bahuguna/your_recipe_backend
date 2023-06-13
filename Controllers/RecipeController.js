const recipeModel = require('../Models/RecipeModel');
const { getOrSetCache } = require('../Utils/GetOrSetCache');
const cloudinary = require('cloudinary').v2;

exports.createRecipe = async (req, res) => {
	try {
		const { id } = req.user;
		const {
			recipeName,
			type,
			category,
			area,
			mainIngredient,
			ingredients,
			makingInstructions,
			thumbnailImage,
			images,
			videos
		} = req.body;

		const newRecipe = new recipeModel({
			recipeName,
			type,
			category,
			area,
			mainIngredient,
			ingredients,
			makingInstructions,
			recipeBy: id,
			thumbnailImage,
			images,
			videos
		});

		const response = await newRecipe.save();

		res.status(200).json({
			success: true,
			message: 'Recipe added succesfully',
			recipe: response
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error
		});
	}
};

exports.uploadMedia = async (req, res) => {
	try {
		let thumbnailImage = {};
		let images = [];
		let videos = [];

		let result = await cloudinary.uploader.upload(
			req.files.thumbnailImage.tempFilePath,
			{
				folder: 'Recipe/thumbnails'
			}
		);

		thumbnailImage = { id: result.public_id, url: result.secure_url };

		for (let i = 0; i < req.files.images.length; i++) {
			result = await cloudinary.uploader.upload(
				req.files.images[i].tempFilePath,
				{
					folder: 'Recipe/images'
				}
			);
			images.push({ id: result.public_id, url: result.secure_url });
		}

		if (req.files.videos !== undefined) {
			for (let i = 0; i < req.files.videos.length; i++) {
				result = await cloudinary.uploader.upload(
					req.files.videos[i].tempFilePath,
					{
						folder: 'Recipe/videos'
					}
				);
				videos.push({ id: result.public_id, url: result.secure_url });
			}
		}

		res.status(200).json({
			success: true,
			message: 'media files uploded successfully',
			thumbnailImage,
			images,
			videos
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.editMedia = async (req, res) => {
	try {
	} catch (error) {}
};

exports.editRecipe = async (req, res) => {
	try {
		const { id } = req.user;
		const { recipeId } = req.params;
		const {
			recipeName,
			type,
			category,
			area,
			mainIngredient,
			ingredients,
			makingInstructions
		} = req.body;
		const updatedRecipe = await recipeModel.findOneAndUpdate(
			{ _id: recipeId, recipeBy: id },
			{
				recipeName,
				type,
				category,
				area,
				mainIngredient,
				ingredients,
				makingInstructions
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: 'recipe updated successfully',
			updatedRecipe
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.deleteRecipe = async (req, res) => {
	try {
		const { id } = req.user;
		const { recipeId } = req.params;
		if (!recipeId) {
			throw new Error('please provide recipe id');
		}
		const deletedRecipe = await recipeModel.findOneAndDelete({
			_id: recipeId,
			recipeBy: id
		});

		res.status(200).json({
			success: true,
			message: 'recipe deleted successfully',
			deletedRecipe
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getAllRecipe = async (req, res) => {
	try {
		const allRecipes = await getOrSetCache('allRecipe', async () => {
			const recipe = await recipeModel.find();
			return recipe;
		});

		res.status(200).json({
			success: true,
			message: 'got all recipes successfully',
			allRecipes
		});
	} catch (error) {
		console.log(error);
		res.status(200).json({
			success: false,
			mesage: error.message
		});
	}
};

exports.getAllRecipeOfAuser = async (req, res) => {
	try {
		const { id } = req.user;

		const allRecipes = await getOrSetCache(`recipe${id}`, async () => {
			return await recipeModel.find({ recipeBy: id });
		});

		res.status(200).json({
			success: true,
			allRecipes,
			totalRecipes: allRecipes.length
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.likePost = async (req, res) => {
	try {
		const { id } = req.user;
		const { recipeId } = req.params;

		const recipe = await recipeModel.findOne({ _id: recipeId });
		let liked;
		let message;

		if (recipe.likedBy.includes(id)) {
			// unlike or remove id

			liked = await recipeModel.findByIdAndUpdate(
				{ _id: recipeId },
				{ $pull: { likedBy: id } },
				{
					new: true
				}
			);
			message = 'disliked';
		} else {
			//like or add id
			liked = await recipeModel.findByIdAndUpdate(
				{ _id: recipeId },
				{ $push: { likedBy: id } },
				{
					new: true
				}
			);
			message = 'liked';
		}

		res.status(200).json({
			success: true,
			message: `${message} Successfully`,
			liked
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};
