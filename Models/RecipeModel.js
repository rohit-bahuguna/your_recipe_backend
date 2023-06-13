const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
	{
		recipeName: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: ['vegetarian', 'nonVegetarian', 'vegan']
		},
		category: {
			type: String,
			required: true
		},
		area: {
			type: String,
			required: true
		},
		mainIngredient: {
			type: String,
			required: true
		},
		ingredients: [
			{
				name: {
					type: String,
					required: true
				},
				quantity: {
					type: String,
					required: true
				},
				scale: {
					type: String,
					required: true
				},
				description: {
					type: String
				}
			}
		],
		makingInstructions: [
			{
				type: String,
				required: true
			}
		],
		thumbnailImage: {
			id: {
				type: String,
				require: true
			},

			url: {
				type: String,
				required: true
			}
		},
		images: [
			{
				id: {
					type: String,
					require: true
				},

				url: {
					type: String,
					required: true
				}
			}
		],
		videos: [
			{
				id: {
					type: String,
					require: true
				},

				url: {
					type: String,
					required: true
				}
			}
		],
		recipeBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		likedBy: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true
			}
		]
	},
	{ timestamps: true }
);

// animalSchema.index({ name: 1, type: -1 });

recipeSchema.index({ recipeName: 1 });
recipeSchema.index({ area: 1 });
recipeSchema.index({ category: 1 });
recipeSchema.index({ mainingredient: 1 });
recipeSchema.index({ type: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);
