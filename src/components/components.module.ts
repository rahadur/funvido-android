import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';
import { ActionSheetComponent } from './action-sheet/action-sheet';



@NgModule({
	declarations: [
		ActionSheetComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		ActionSheetComponent
	]
})
export class ComponentsModule {}
