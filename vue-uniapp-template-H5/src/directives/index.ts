import { stickyDirective } from './directive-stricky';

export const registerDirectives= (app:any)=>{
	app.directive('sticky', stickyDirective);
}
