import React from "react";
import "./QuoteHolder.css";

export default function QuoteHolder({ quote, index, author, copy }) {
	const handleHover = (e) => {
		e.currentTarget.querySelector(".copy").classList.add("hovered");
	};

	const handleHoverExit = (e) => {
		e.currentTarget.querySelector(".copy").classList.remove("hovered");
	};

	// Create a media condition that targets viewports at least 768px wide
	const mediaQuery = window.matchMedia("(max-width: 1000px)");

	return (
		<div
			key={index}
			className="quote-card"
			onMouseEnter={handleHover}
			onMouseLeave={handleHoverExit}
			onClick={(e) => {
				copy(quote, author.name);
				if (mediaQuery.matches){
					setTimeout(() => {
						e.currentTarget.querySelector(".copy").classList.remove("hovered");
					}, 2000);
				}
			}}
		>
			<div className="copy">Click anywhere to copy</div>
			<p>{quote.quote}</p>
			<img src={author.picUrl} alt={author.name} />
			<h6>{author.name}</h6>
		</div>
	);
}
