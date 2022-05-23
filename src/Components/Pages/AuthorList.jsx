import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import "./AuthorList.css";
import "../Animation.css";
import QuotesList from "./QuotesList";


export default function Authors({ updateTitle, updateSubTitle }) {
	let {
		data: authors,
		isPending,
		error,
	} = useFetch("https://evequote-json-server.herokuapp.com/authors");

	let authorListRef = useRef();

	let [selectedAuthor, setSelectedAuthor] = useState(null);

	useEffect(() => {
		if (selectedAuthor) {
			if (!authorListRef.current.classList.contains("horizontal-row")) {
				// TODO hide author list
				authorListRef.current.classList.add("horizontal-row");
			}
		}
	}, [selectedAuthor]);

	const handleHover = (e) => {
		e.currentTarget
			.querySelector(".author-image")
			.classList.add("author-holder-hovered");
		e.currentTarget
			.querySelector(".author-details-holder")
			.classList.add("author-holder-hovered");
	};

	const handleHoverExit = (e) => {
		e.currentTarget
			.querySelector(".author-image")
			.classList.remove("author-holder-hovered");
		e.currentTarget
			.querySelector(".author-details-holder")
			.classList.remove("author-holder-hovered");
		// if (view) view.classList.remove('hovered');
	};

	// Create a media condition that targets viewports at least 768px wide
	const mediaQuery = window.matchMedia("(max-width: 1000px)");

	return (
		<div className="author-root">
			{updateTitle && !selectedAuthor && updateTitle("Authors")}
			{updateSubTitle && !selectedAuthor && updateSubTitle("")}
			<div className="author-list" ref={authorListRef}>
				{authors &&
					authors.map((author, index) => (
						<div
							key={author.name}
							className="author-holder"
							onMouseEnter={handleHover}
							onMouseLeave={handleHoverExit}
							onClick={(e) => {
								updateTitle(author.name + "'s Quotes");
								author.authorIndex = index;
								setSelectedAuthor(author);
								if (mediaQuery.matches) {
									e.currentTarget.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								}
								setTimeout(() => {
									document.querySelector(".author-root").scrollIntoView({
										top: 0,
										left: 0,
										behavior: "smooth",
									});
								}, 100);
							}}
						>
							<img
								className="author-image"
								src={author.picUrl}
								alt={author.name}
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "http://i.imgur.com/C6JnWnH.png";
								}}
							/>
							<div className="author-details-holder">
								<h2>{author.name}</h2>
								<h4>{author.profession}</h4>
							</div>
						</div>
					))}
			</div>
			{selectedAuthor && (
				<div className="author-quotes">
					<QuotesList selectedAuthor={selectedAuthor} />
				</div>
			)}
		</div>
	);
}
