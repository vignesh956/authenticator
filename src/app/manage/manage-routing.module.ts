import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchiveComponent } from '../manage-section/achive/achive.component';
import { DraftComponent } from '../manage-section/draft/draft.component';
import { EmailComponent } from '../manage-section/email/email.component';
import { InboxComponent } from '../manage-section/inbox/inbox.component';
import { OutboxComponent } from '../manage-section/outbox/outbox.component';
import { TrashComponent } from '../manage-section/trash/trash.component';

const routes: Routes = [
  {path : "achive",component:AchiveComponent},
  {path:"draft",component:DraftComponent},
  {path:"inbox" , component:InboxComponent},
  {path:"outbox",component:OutboxComponent},
  {path:"trash",component:TrashComponent},
  {path:"email", component:EmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
