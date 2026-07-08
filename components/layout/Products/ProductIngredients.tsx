import React from "react";

export default function ProductIngredients({
  ingredients,
}: {
  ingredients: { title: string; description: string }[];
}) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <p className="text-gray-500">Ingredient information not available.</p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 mt-4">
      <table className="w-full text-left text-sm text-gray-700">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="p-4 font-semibold text-gray-900 w-1/3">
              Ingredient Name
            </th>
            <th className="p-4 font-semibold text-gray-900">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {ingredients.map((ingredient, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900 border-r border-gray-200">
                {ingredient.title}
              </td>
              <td className="p-4">{ingredient.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
