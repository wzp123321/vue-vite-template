// 吸顶指令
export const stickyDirective = {
	mounted(el: any, binding: any) {
		el.style.position = 'static';
		
		const { offsetTop } = binding.value
		
		const handleScroll = () => {
			
			const scroll_top = document.documentElement.scrollTop;
			const offset_top = el.offsetTop;
			console.log(scroll_top, offsetTop, offset_top,'滚动条滚动得距离000');
			if (offset_top - scroll_top < 0) {
				el.style.position = 'fixed';
				el.style.top = offsetTop + 'px';
			}
		};
		window.addEventListener('scroll', handleScroll, false);
	},
};
