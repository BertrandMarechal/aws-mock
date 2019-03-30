import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as fromDatabases from '@app/store/reducers/databases.reducers';
import * as DatabasesActions from '@app/store/actions/databases.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DatabaseTable, DatabaseTableForSave } from '@app/models/database-file.model';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertResult } from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  databases$: Observable<fromDatabases.State>;
  @ViewChild('swalTemplate') swalTemplate: SwalComponent;
  templateFormControl: FormControl;

  constructor(
    private store: Store<fromDatabases.State>
  ) { }

  filter: string;
  databaseTable: DatabaseTable;
  editTable: boolean;
  actions = [{
    name: 'Add table',
    value: 'add-table'
  }, {
    name: 'Generate Functions',
    value: 'generate-functions'
  }, {
    name: 'Add Template',
    value: 'add-template'
  }];

  ngOnInit() {
    this.templateFormControl = new FormControl();
    this.databases$ = this.store.pipe(select('databases'));
    this.databases$.subscribe((state: fromDatabases.State) => {
      if (!state.database || !state.database._properties.dbName) {
        this.actions = [{
          name: 'Initialize',
          value: 'init'
        }];
      } else {

        this.actions = [{
          name: 'Add table',
          value: 'add-table'
        }, {
          name: 'Generate Functions',
          value: 'generate-functions'
        }, {
          name: 'Add Template',
          value: 'add-template'
        }];
      }
    });
  }

  onClickTable(table: DatabaseTable) {
    this.databaseTable = table;
  }

  onActionClicked(action: { name: string; value: string; }) {
    if (action.value === 'add-table') {
      this.editTable = true;
      // this.store.dispatch(new DatabasesActions.PageCreateDatabaseTable());
    } else if (action.value === 'generate-functions') {
      this.store.dispatch(new DatabasesActions.PageCreateDatabaseFunctions());
    } else if (action.value === 'init') {
      this.store.dispatch(new DatabasesActions.PageInitializeDatabase());
    } else if (action.value === 'add-template') {
      this.templateFormControl.reset();
      this.swalTemplate.show();
    }
  }

  onChoseTemplate(swalResult: SweetAlertResult) {
    this.store.dispatch(new DatabasesActions.PageAddTemplate(this.templateFormControl.value));
  }

  onSave($event: DatabaseTableForSave) {
    this.store.dispatch(new DatabasesActions.PageCreateDatabaseTable($event));
  }
}
