export default function scroll(element) {
	window.scrollTo({
		behavior: 'smooth',
		left: 0,
		top: element.offsetTop
	});
}
