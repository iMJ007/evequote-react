import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./CategoriesList.css";
import "../Animation.css";
import QuotesList from "./QuotesList";

export default function CategoriesList({ updateTitle, updateSubTitle }) {
	const [selectedCategory, setSelectedCategory] = useState(null);

	let categoryListRef = useRef();

	let {
		data: categories,
		isPending,
		error,
	} = useFetch("https://evequote-json-server.herokuapp.com/categories");

	// Create a media condition that targets viewports at least 768px wide
	const mediaQuery = window.matchMedia("(max-width: 1000px)");
	
	useEffect(() => {
		if (selectedCategory) {
			if (!categoryListRef.current.classList.contains("horizontal-row")) {
				categoryListRef.current.classList.add("horizontal-row");
			}
		}
	}, [selectedCategory]);

	return (
		<div className="category-root">
			{updateTitle &&
				updateTitle(
					selectedCategory
						? `${selectedCategory.title} Quotes`
						: "Quote Categories"
				)}
			{updateSubTitle && updateSubTitle("")}
			<div className="category-list-container" ref={categoryListRef}>
				{categories &&
					categories.map((category) => (
						<div
							key={category.title}
							className="category-holder"
							onClick={(e) => {
								setSelectedCategory(category);
								if (mediaQuery.matches){
									console.log(mediaQuery.matches)
									e.currentTarget.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								}
								setTimeout(() => {
									document.querySelector('.category-root').scrollIntoView({
										top: 0,
										left: 0,
										behavior: "smooth",
									});
								}, 100);
							}}
						>
							<img
								className="category-image"
								src={category.imageUrl}
								alt={category.title}
							/>
							<div className="category-description-container">
								<h2>{category.title}</h2>
								<p>{category.description}</p>
							</div>
						</div>
					))}
			</div>
			{selectedCategory && (
				<div className="category-quotes">
					<QuotesList selectedCategory={selectedCategory} />
				</div>
			)}
		</div>
	);
}
