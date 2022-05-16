import React from "react";
import "./QuoteHolder.css";

export default function QuoteHolder({ quote, index, author, copy }) {
	const handleHover = (e) => {
		e.currentTarget.querySelector(".copy").classList.add("hovered");
	};

	const handleHoverExit = (e) => {
		e.currentTarget.querySelector(".copy").classList.remove("hovered");
	};

	return (
		<div
			key={index}
			className="quote-card"
			onMouseEnter={handleHover}
			onMouseLeave={handleHoverExit}
			onClick={(e) => copy(quote, author.name)}
		>
			<div className="copy">Click anywhere to copy</div>
			<p>{quote.quote}</p>
			<img src={author.picUrl} />
			<h6>{author.name}</h6>
		</div>
	);
}
