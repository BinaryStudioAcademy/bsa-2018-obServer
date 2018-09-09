export const copyToClipboard = (text: string) => {
	document.addEventListener('copy', (e: ClipboardEvent) => {
		e.clipboardData.setData('text/plain', text);
		e.preventDefault();
		document.removeEventListener('copy', null);
	});
	document.execCommand('copy');
};
