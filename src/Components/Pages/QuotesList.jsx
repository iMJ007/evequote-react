import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { useFetch } from "../../hooks/useFetch";
import "./QuotesList.css";
import "../Animation.css";
import QuoteHolder from "../QuoteHolder";

export default function QuotesList({ updateTitle, updateSubTitle, selectedAuthor, selectedCategory }) {
	let [page, setPage] = useState();

	useEffect(() => {
		setPage(1);
	}, [selectedAuthor, selectedCategory]);
	let {
		data: quotes,
		isPending,
		error,
	} = useFetch(`https://evequote-json-server.herokuapp.com/quotes?${selectedAuthor ? 'authorIndex=' + selectedAuthor.authorIndex + '&' : ''}${selectedCategory ? 'quoteCategory=' + selectedCategory.title + '&' : ''}_page=${page}&_limit=20`);
	let { data: authors } = useFetch("https://evequote-json-server.herokuapp.com/authors");
	const toast = useRef();
	const list = useRef();

	const copy = (quote, name) => {
		toast.current.classList.add("shown");
		toast.current.innerText = `${name}'s quote copied to clipboard!`;
		navigator.clipboard.writeText(quote.quote + "\n\n- " + name);
		setTimeout(() => {
			toast.current.classList.remove("shown");
		}, 2000);
	};

	const handlePaginate = (e) => {
		if (e.target.id == "next") {
			setPage(page + 1);
		} else {
			setPage(page - 1);
		}
	};

	const breakpointColumnsObj = {
		default: selectedAuthor ? 3 : selectedCategory ? 2 : 5,
		1100: 4,
		700: 2,
		500: 1,
	};
    
	return (
		<div className="quotes-list-root">
			{isPending && (
				<div style={{ position: "fixed", top: "50%", left: "50%" }}>
					Fetching Quotes...
				</div>
			)}
			{error && <div>Error fetching</div>}
			{updateTitle && updateTitle(`${selectedAuthor ? selectedAuthor.name + ' Quotes' : 'All Quotes'}`)}
			{quotes &&
				updateSubTitle &&
				updateSubTitle("#" + page * quotes.length + " / 2207")}
			{!isPending && quotes && authors && (
				<Masonry
					breakpointCols={ quotes.length === 2 ? {default : 2} : breakpointColumnsObj}
					className="quotes-list"
					ref={list}
					columnClassName="quotes-list-col"
				>
					{quotes.map((quote, index) => (
						<QuoteHolder
							author={authors[quote.authorIndex]}
							quote={quote}
							index={index}
							copy={copy}
							
						/>
					))}
				</Masonry>
			)}
			<div className="toast" ref={toast}></div>
			<div className="paginate-button-container">
				{page > 1 && (
					<span
						className="paginate-button"
						id="previous"
						onClick={handlePaginate}
					>
						&lt;
					</span>
				)}
				{page < 111 && quotes && quotes.length === 20 && (
					<span className="paginate-button" id="next" onClick={handlePaginate}>
						&gt;
					</span>
				)}
			</div>
		</div>
	);
}
