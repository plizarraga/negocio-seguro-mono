import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/features/auth';

@Directive({
  selector: '[authorizedRole]',
  providers: [AuthService],
  standalone: true,
})
export class IsAuthorizedDirective {
  @Input('authorizedRole') set authorizedRole(authorizedRoles: string[]) {
    const userRole = this.authService.getUserRole();
    if (userRole && this.authService.isAuthorized(userRole, authorizedRoles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}
}
